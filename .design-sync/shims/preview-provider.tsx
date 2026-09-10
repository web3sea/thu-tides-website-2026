// design-sync preview harness. Merged into _ds_bundle.js via cfg.extraEntries, but it only
// ACTS on the converter's preview-card pages (detected by the card runtime's globals), never
// inside a design built with the bundle.
//
// Captures run at frame 0, so anything that starts at opacity 0 (framer-motion `initial`,
// tw-animate `animate-in`) screenshots blank, and scroll-gated content (`useInView`,
// `whileInView`, ScrollReveal's IntersectionObserver) never fires without a real scroll.
// On a preview page we skip motion, report every observed element as in view, and rewrite
// root-relative public/ media paths to the live site's image optimizer.
import { MotionGlobalConfig } from 'framer-motion';

const ORIGIN = 'https://www.thutides.com';
const CSS = `
*, *::before, *::after {
  animation-duration: 0s !important; animation-delay: 0s !important;
  transition-duration: 0s !important; transition-delay: 0s !important;
}`;

function isPreviewPage(): boolean {
  const w = window as any;
  return typeof w.__dsPreview === 'object' || typeof w.__dsCells !== 'undefined'
    || !!document.querySelector('.ds-cell, .ds-single');
}

function rewriteMedia(root: ParentNode) {
  // `^="/"` alone also matches protocol-relative `//cdn...` URLs; exclude those.
  root.querySelectorAll<HTMLImageElement>('img[src^="/"]:not([src^="//"])').forEach((el) => {
    el.src = `${ORIGIN}/_next/image?url=${encodeURIComponent(el.getAttribute('src')!)}&w=1200&q=75`;
  });
  root.querySelectorAll<HTMLElement>('video[poster^="/"]:not([poster^="//"])').forEach((el) => {
    el.setAttribute('poster', `${ORIGIN}/_next/image?url=${encodeURIComponent(el.getAttribute('poster')!)}&w=1200&q=75`);
  });
  // never pull multi-MB originals into a capture: drop the video source, keep the poster
  root.querySelectorAll<HTMLElement>('video[src^="/"]:not([src^="//"]), source[src^="/"]:not([src^="//"])').forEach((el) => el.removeAttribute('src'));
}

function activate() {
  const w = window as any;
  if (w.__dsPreviewPatched || !isPreviewPage()) return;
  w.__dsPreviewPatched = true;
  MotionGlobalConfig.skipAnimations = true;
  class AlwaysInView {
    readonly root = null; readonly rootMargin = '0px'; readonly thresholds = [0];
    private cb: IntersectionObserverCallback;
    constructor(cb: IntersectionObserverCallback) { this.cb = cb; }
    observe(target: Element) {
      const rect = target.getBoundingClientRect();
      const entry = { target, isIntersecting: true, intersectionRatio: 1, time: performance.now(),
        boundingClientRect: rect, intersectionRect: rect, rootBounds: null } as IntersectionObserverEntry;
      queueMicrotask(() => this.cb([entry], this as unknown as IntersectionObserver));
    }
    unobserve() {} disconnect() {} takeRecords() { return []; }
  }
  w.IntersectionObserver = AlwaysInView;
  const style = document.createElement('style');
  style.setAttribute('data-ds-preview', '');
  style.textContent = CSS;
  document.head.appendChild(style);
  rewriteMedia(document);
  new MutationObserver(() => rewriteMedia(document))
    .observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'poster'] });
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  // The bundle loads before the card's own script, so defer detection until the page has parsed.
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', activate);
  else queueMicrotask(activate);
}

export const __dsPreviewHarness = true;
