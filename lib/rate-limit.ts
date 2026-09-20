/**
 * Fixed-window, in-memory rate limiter.
 *
 * Deliberately not distributed. Two consequences worth knowing before using it:
 * state is per-instance, so the effective ceiling is `max` x the number of warm
 * instances, and it resets on a cold start. That is fine for blunting a naive
 * flood on a low-volume endpoint. Where the count has to be exact, use a shared
 * store instead -- app/api/votes/location/route.ts uses a Firestore transaction.
 *
 * Memory is bounded in both directions, which is the part that is easy to get
 * wrong. A sweep that only drops expired entries cannot help during a burst of
 * distinct keys inside a single window, because nothing is expired yet; without
 * a hard cap the map grows without limit exactly when it is under attack. So:
 *
 * - the sweep runs at most once per window, not per request, so a large map does
 *   not turn every request into an O(n) scan
 * - if the map is still at `maxEntries` after a sweep, the entries closest to
 *   expiring are evicted until it fits
 *
 * Eviction can let an over-limit caller through early. That is the intended
 * trade: a bounded amount of memory and predictable CPU, versus a limiter that
 * can be used to exhaust either.
 */

export interface RateLimiterOptions {
  /** Requests allowed per window. */
  max: number
  /** Window length in milliseconds. */
  windowMs: number
  /** Hard ceiling on tracked keys. Oldest-expiring are evicted past this. */
  maxEntries?: number
  /** Injectable clock, for tests. Defaults to Date.now. */
  now?: () => number
}

export interface RateLimiter {
  /** Records a hit for `key`. Returns true when the caller is over the limit. */
  check(key: string): boolean
  /** Tracked key count. For tests and diagnostics. */
  readonly size: number
}

export function createRateLimiter({
  max,
  windowMs,
  maxEntries = 10_000,
  now = Date.now,
}: RateLimiterOptions): RateLimiter {
  const entries = new Map<string, { count: number; resetTime: number }>()
  let lastSweep = 0

  function sweep(currentTime: number): void {
    for (const [key, entry] of entries) {
      if (currentTime > entry.resetTime) entries.delete(key)
    }
  }

  function evictOldest(target: number): void {
    // Sorting is O(n log n) but only runs when a sweep has already failed to free
    // space, which needs maxEntries distinct keys inside one window.
    const byExpiry = Array.from(entries.entries()).sort(
      (a, b) => a[1].resetTime - b[1].resetTime
    )
    for (const [key] of byExpiry) {
      if (entries.size <= target) break
      entries.delete(key)
    }
  }

  return {
    check(key: string): boolean {
      const currentTime = now()

      if (currentTime - lastSweep >= windowMs) {
        sweep(currentTime)
        lastSweep = currentTime
      }

      const entry = entries.get(key)

      if (!entry || currentTime > entry.resetTime) {
        if (!entry && entries.size >= maxEntries) {
          sweep(currentTime)
          if (entries.size >= maxEntries) evictOldest(maxEntries - 1)
        }
        entries.set(key, { count: 1, resetTime: currentTime + windowMs })
        return false
      }

      // Stop counting past the limit: the answer cannot change and nothing reads
      // the number, so there is no reason to let it grow.
      if (entry.count <= max) entry.count++
      return entry.count > max
    },

    get size() {
      return entries.size
    },
  }
}
