// design-sync shim for `next/navigation`: the App Router hooks throw outside
// a Next request context. Previews run at "/" with a no-op router.
export function usePathname(): string { return '/'; }
export function useSearchParams(): URLSearchParams { return new URLSearchParams(); }
export function useParams(): Record<string, string> { return {}; }
export function useRouter() {
  const noop = () => {};
  return { push: noop, replace: noop, back: noop, forward: noop, refresh: noop, prefetch: noop };
}
export function redirect(): never { throw new Error('redirect() is not available in design previews'); }
export function notFound(): never { throw new Error('notFound() is not available in design previews'); }
