// design-sync preview wrapper (cfg.provider). Wraps PREVIEW CARDS ONLY - designs
// built with the bundle never render it. Captures run at frame 0, so anything that
// starts at opacity 0 (framer-motion `initial`, tw-animate `animate-in`) screenshots
// blank, and scroll-gated content (`useInView`, `whileInView`, ScrollReveal's
// IntersectionObserver) never fires without a real scroll. Inside the cards we skip
// motion and report every observed element as in view.
//
// All side effects live INSIDE the component body (guarded, idempotent): this module
// is merged into _ds_bundle.js via cfg.extraEntries, so module-level patches would
// leak into every design.
import * as React from 'react';
import { MotionGlobalConfig } from 'framer-motion';

const CSS = `
[data-ds-preview] *, [data-ds-preview] *::before, [data-ds-preview] *::after {
  animation-duration: 0s !important; animation-delay: 0s !important;
  transition-duration: 0s !important; transition-delay: 0s !important;
}`;

function patchOnce() {
  const w = window as any;
  if (w.__dsPreviewPatched) return;
  w.__dsPreviewPatched = true;
  MotionGlobalConfig.skipAnimations = true;
  class AlwaysInView {
    readonly root = null; readonly rootMargin = '0px'; readonly thresholds = [0];
    private cb: IntersectionObserverCallback;
    constructor(cb: IntersectionObserverCallback) { this.cb = cb; }
    observe(target: Element) {
      const entry = {
        target, isIntersecting: true, intersectionRatio: 1, time: performance.now(),
        boundingClientRect: target.getBoundingClientRect(), intersectionRect: target.getBoundingClientRect(),
        rootBounds: null,
      } as IntersectionObserverEntry;
      queueMicrotask(() => this.cb([entry], this as unknown as IntersectionObserver));
    }
    unobserve() {} disconnect() {} takeRecords() { return []; }
  }
  w.IntersectionObserver = AlwaysInView;
}

const ORIGIN = 'https://www.thutides.com';
// Plain <img>/<video>/<source> elements (not next/image) keep root-relative
// public/ paths; rewrite them inside the card so media renders. Images go
// through the optimizer; video/poster attributes hit the origin directly.
function rewriteMedia(root: HTMLElement) {
  root.querySelectorAll<HTMLImageElement>('img[src^="/"]').forEach((el) => {
    el.src = `${ORIGIN}/_next/image?url=${encodeURIComponent(el.getAttribute('src')!)}&w=1200&q=75`;
  });
  root.querySelectorAll<HTMLElement>('video[poster^="/"]').forEach((el) => {
    el.setAttribute('poster', `${ORIGIN}/_next/image?url=${encodeURIComponent(el.getAttribute('poster')!)}&w=1200&q=75`);
  });
  root.querySelectorAll<HTMLElement>('video[src^="/"], source[src^="/"]').forEach((el) => {
    // never pull multi-MB originals into a capture: drop the video source, keep the poster
    el.removeAttribute('src');
  });
}

export function PreviewMotionProvider({ children }: { children?: React.ReactNode }) {
  if (typeof window !== 'undefined') patchOnce();
  const ref = React.useRef<HTMLDivElement>(null);
  React.useLayoutEffect(() => {
    if (!ref.current) return;
    rewriteMedia(ref.current);
    const mo = new MutationObserver(() => ref.current && rewriteMedia(ref.current));
    mo.observe(ref.current, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'poster'] });
    return () => mo.disconnect();
  }, []);
  return (
    <div data-ds-preview="" ref={ref}>
      <style>{CSS}</style>
      {children}
    </div>
  );
}
