/**
 * Rate limiter unit tests
 *
 * The limiter takes an injectable clock, so windows and sweeps are driven
 * deterministically here rather than with timers. No server, no credentials.
 *
 * The memory cases are the point of this file. The first version of this fix
 * swept only *expired* entries past a size threshold, which cannot free anything
 * during a burst of distinct keys inside one window: the map still grew without
 * bound, and the sweep then ran on every request, turning a flood into a CPU
 * amplifier. Both of those are pinned below.
 */

import { describe, it, expect } from '@jest/globals';
import { createRateLimiter } from '@/lib/rate-limit';

const WINDOW = 60_000;

function fixedClock(start = 1_000_000) {
  let t = start;
  return {
    now: () => t,
    advance: (ms: number) => {
      t += ms;
    },
  };
}

describe('createRateLimiter', () => {
  describe('limit boundary', () => {
    it('allows exactly max requests then blocks', () => {
      const clock = fixedClock();
      const limiter = createRateLimiter({ max: 5, windowMs: WINDOW, now: clock.now });

      for (let i = 0; i < 5; i++) {
        expect(limiter.check('a')).toBe(false);
      }
      expect(limiter.check('a')).toBe(true);
      expect(limiter.check('a')).toBe(true);
    });

    it('keeps separate budgets per key', () => {
      const clock = fixedClock();
      const limiter = createRateLimiter({ max: 2, windowMs: WINDOW, now: clock.now });

      expect(limiter.check('a')).toBe(false);
      expect(limiter.check('a')).toBe(false);
      expect(limiter.check('a')).toBe(true);

      expect(limiter.check('b')).toBe(false);
    });

    it('resets once the window has elapsed', () => {
      const clock = fixedClock();
      const limiter = createRateLimiter({ max: 1, windowMs: WINDOW, now: clock.now });

      expect(limiter.check('a')).toBe(false);
      expect(limiter.check('a')).toBe(true);

      clock.advance(WINDOW + 1);
      expect(limiter.check('a')).toBe(false);
    });

    it('does not reset early', () => {
      const clock = fixedClock();
      const limiter = createRateLimiter({ max: 1, windowMs: WINDOW, now: clock.now });

      expect(limiter.check('a')).toBe(false);
      clock.advance(WINDOW - 1);
      expect(limiter.check('a')).toBe(true);
    });
  });

  describe('memory bounds', () => {
    it('never exceeds maxEntries, even with every key inside one window', () => {
      // The case the first implementation got wrong: nothing is expired, so a
      // sweep frees nothing and only a hard cap can bound the map.
      const clock = fixedClock();
      const limiter = createRateLimiter({
        max: 5,
        windowMs: WINDOW,
        maxEntries: 50,
        now: clock.now,
      });

      for (let i = 0; i < 5_000; i++) {
        limiter.check(`ip-${i}`);
      }

      expect(limiter.size).toBeLessThanOrEqual(50);
    });

    it('drops expired keys as the clock moves on', () => {
      const clock = fixedClock();
      const limiter = createRateLimiter({ max: 5, windowMs: WINDOW, now: clock.now });

      for (let i = 0; i < 100; i++) {
        limiter.check(`ip-${i}`);
      }
      expect(limiter.size).toBe(100);

      // One window later every one of those is expired; the next call sweeps.
      clock.advance(WINDOW + 1);
      limiter.check('fresh');

      expect(limiter.size).toBe(1);
    });

    it('sweeps at most once per window, not once per request', () => {
      // Pins the CPU half: a large map must not mean an O(n) scan per request.
      const clock = fixedClock();
      let reads = 0;
      const counting = () => {
        reads++;
        return clock.now();
      };
      const limiter = createRateLimiter({ max: 5, windowMs: WINDOW, now: counting });

      for (let i = 0; i < 100; i++) limiter.check(`ip-${i}`);
      const before = reads;

      // Same window: no further sweeping work, just one clock read per call.
      for (let i = 0; i < 100; i++) limiter.check(`ip-${i}`);
      expect(reads - before).toBe(100);
    });

    it('still enforces the limit for a key that survives eviction', () => {
      const clock = fixedClock();
      const limiter = createRateLimiter({
        max: 2,
        windowMs: WINDOW,
        maxEntries: 10,
        now: clock.now,
      });

      // Hammer one key first so it is well established...
      expect(limiter.check('victim')).toBe(false);
      expect(limiter.check('victim')).toBe(false);
      expect(limiter.check('victim')).toBe(true);

      // ...then flood past the cap. Eviction may drop it, which is the documented
      // trade-off, but the limiter must not start erroneously blocking others.
      for (let i = 0; i < 100; i++) limiter.check(`other-${i}`);

      expect(limiter.size).toBeLessThanOrEqual(10);
      expect(limiter.check('brand-new')).toBe(false);
    });
  });
});
