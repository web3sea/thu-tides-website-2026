# design-sync notes (thu-tides-website)

Repo-specific facts a future sync needs. Config lives in `config.json`; this file holds the why.

## Shape and virtual package
- This is a Next.js site, not a component package: no `dist/`, no Storybook. `prepare.mjs` (cfg.buildCmd)
  assembles a virtual package under `.design-sync/.cache/pkg/`: `index.ts` re-exporting every component
  in `components/` and `components/ui/`, a tsc `--emitDeclarationOnly` tree under `types/`, and the
  compiled stylesheet. All `cfg.*` paths are relative to that pkg dir (`../../..` = repo root).
- `index.ts` must use RELATIVE specifiers, not `@/`: tsc keeps specifiers verbatim and the ts-morph
  parse has no alias map, so `@/` re-exports resolve to nothing (every props body came back empty).
- `types/index.d.ts` is a hand-written root entry so the ts-morph glob covers the whole tree.
- Demo/example files are excluded via `componentSrcMap: null` (ComponentExample, FooterExample,
  TextHoverEffectDemo, Example, ExampleWrapper) and skipped by prepare.mjs.

## Next.js-only imports are shimmed
- `next/image`, `next/link`, `next/navigation` pull Next internals that reference `process` (every card
  threw `process is not defined`). `.design-sync/tsconfig.json` aliases them to `shims/*`; cfg.tsconfig
  points at it (pkg-relative `../../tsconfig.json`).
- The image shim also resolves root-relative `public/` asset paths against `https://www.thutides.com`
  (the bare `thutides.com` and the `*.vercel.app` URL do not serve them). If the production domain
  changes, update `ASSET_ORIGIN` in `shims/next-image.tsx`.

## Styling
- Tailwind v4, compiled by `prepare.mjs` from `styles.src.css` (imports `app/globals.css`, Google Fonts for
  Geist / Geist Mono / Noto Sans / Material Symbols Outlined, and sets the `--font-*` variables that
  `next/font` would inject on `<html>`).
- Tailwind only emits classes present in source, and designs receive ONLY this stylesheet, so
  `styles.src.css` safelists common layout/spacing/typography utilities with `@source inline(...)` and
  scans `.design-sync/previews/`. Extend the safelist there if the design agent's glue classes go unstyled.
- Component quirk (faithful, not a sync bug): `Typography` variants `accent-primary`/`accent-secondary`
  render in the foreground colour because the cva `color` default (`text-foreground`, utilities layer)
  wins over `text-brand-*` (components layer). Same on the live site.

## Render check
- Playwright is installed in `.ds-sync/` without a browser download; the render check uses Puppeteer's
  cached Chrome via `DS_CHROMIUM_PATH=~/.cache/puppeteer/chrome/mac_arm-145.0.7632.46/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`.

## Known render warns
- `[FONT_REMOTE]` Geist, Geist Mono, Cambria: served by the Google Fonts @import at runtime - expected.
- `[RENDER_BLANK]` on unauthored leaf components (InputGroupButton, LazyVideo, LocationVoteDropdown,
  PhotoCategorySection, TextHoverEffect): they render nothing without props/children; cleared by authoring.

## Re-sync risks
- `ASSET_ORIGIN` hardcodes the production domain; images vanish from previews if it moves.
- The safelist in `styles.src.css` is a guess at what the design agent needs; it is not derived from the site.
- Component grouping comes from category stubs in `.design-sync/docs/` (cfg.docsDir). A new component
  lands in `general` until a stub is added.
- Google Fonts are fetched at render time; offline captures fall back to system fonts.

## Capture fixes (wave 1 learnings folded)
- `cfg.provider` = `PreviewMotionProvider` from `shims/preview-provider.tsx` (merged via `extraEntries`).
  It wraps preview cards only: zeroes CSS animation/transition durations, sets framer-motion
  `MotionGlobalConfig.skipAnimations`, and replaces `IntersectionObserver` with an always-in-view stub
  so `ScrollReveal`/`useInView`/`whileInView` content is visible at frame 0. Designs never see it.
- The image shim routes root-relative assets through `/_next/image?url=...&w=1200&q=75` on the live
  site. Originals in `public/` are up to 11 MB and time out the 15 s `networkidle` render check.
- `.design-sync/overrides/dts.mjs` fork: `H1`/`H2`/`H3` matched the ALL-CAPS "constant" filter and were
  dropped; the fork exempts `H1`-`H6`. Fresh clone: `ln -sfn ../.ds-sync/node_modules .design-sync/node_modules`.
- `LazyVideo` previews must not pull the 17 MB `website_banner_optimized.mp4`; use a poster and a tiny
  or absent `src` (the in-view stub would otherwise trigger the download).
- Safelist gaps found by agents were added to `styles.src.css` (gradients, `max-h`, `basis`, slate shades).

## Wave learnings folded (2026-09-10 first sync)
- Preview cards: `cfg.overrides` carries the validator's `[GRID_OVERFLOW]` hints (single for every
  open dialog/menu/combobox/select card, column for full-width sections, H1, Logo, Separator) and
  `CaseStudyTemplate: single 900x2000` (its process gallery sits below the cap; acceptable).
- Toaster previews must `import { Toaster, toast } from 'thu-tides-website'`: importing `toast` from
  `sonner` bundles a second copy with its own state, so toasts never reach the bundled `Toaster`.
  `shims/toast.ts` re-exports it via `extraEntries`.
- `LazyVideo` preview uses `src="data:video/mp4,"` + `preload="none"` with an optimizer poster.
- `preview-rebuild.mjs` piped through `tail` shows nothing until exit and once stalled at 0% CPU on a
  59-component batch; run it unpiped in the foreground and in batches, or use a full build.
- Carousels show two slides at the 900 px cell (three only at `lg`), faithful to the site.
- Site facts: GigaHero `badge={null}` (not `undefined`) hides the badge; CollabSection,
  PhotoCategorySection, Navigation render white text and expect GigaLayout's dark shell; Footer paints
  its own background; `featuredPhotos` references `/sunset6_reconnect_buka_buka.webp`, missing on the
  live site too (broken tile in PhotographyPreview); `InputGroupButton size="sm"` equals `xs`;
  `FieldSet disabled` does not dim legend/description.
- Grade sheets are 900x700 per story; forms sheets are mostly whitespace. Cosmetic only.

## Sync state (2026-09-10)
- First full sync completed into Claude Design project `582715b6-486f-46ef-8bbd-712bbed0028c`
  ("Thu Tides Design System"): 126 components, all previews authored and graded good, render check clean.
- Remote also carries app-generated files (`_ds_manifest.json`, `_adherence.oxlintrc.json`,
  `fonts/Cambria-Font-For-MAC.ttf`); they are not from this build and were left alone.
- `ImageGallery` needs `overrides: {cardMode: column, viewport: 1200x900}` because its 3/4-column
  grids only apply at the `lg` breakpoint; captions are hover-only so no static caption story exists.

## Re-sync risks
- `ASSET_ORIGIN` in `shims/next-image.tsx` and `shims/preview-provider.tsx` hardcodes the production
  domain and the `/_next/image` optimizer; if the site moves or the optimizer is disabled, every image
  in previews and designs breaks.
- The Tailwind safelist in `styles.src.css` is hand-curated; a design agent using an unlisted utility
  gets no styling. Extend it rather than expecting the site source to cover it.
- Google Fonts and site images are fetched at capture time; offline runs fall back and grade differently.
- Category stubs in `.design-sync/docs/` must be added for any new component, else it lands in `general`.
- Changing `cfg.overrides`/`cfg.provider` re-keys every affected grade (110 were re-read this run);
  batch such edits before a single driver run.
- Toolchain: Tailwind CLI 4.3.x, esbuild 0.28, ts-morph 28, Playwright 1.63 with Puppeteer's Chrome 145
  via `DS_CHROMIUM_PATH`. A fresh clone must re-run the `.ds-sync/` npm install and recreate the
  `.design-sync/node_modules` symlink.

## Baked-in app fixes (2026-09-10, second sync)
Claude Design's self-check reads every `--name: value;` in the styles.css @import closure as a token
and honours a trailing `/* @kind color|spacing|radius|shadow|font|other */`; it also flags any
non-system family named in a `--font-*` token as a brand font that needs an `@font-face`. Three
fixes that were being made by hand in the app after each sync now live in the sources:
- `prepare.mjs` annotates every declaration in `compiled.css` with `@kind` by name (`--tw-*`, eases,
  animations -> `other`). Tailwind's per-utility `--tw-*` internals cannot be removed from the CSS
  without breaking the utilities; annotating them `other` is the source-level equivalent of filtering.
- `styles.src.css` overrides Tailwind's default `--font-serif` to drop Cambria, so the app no longer
  demands a Cambria @font-face. The site never uses a serif face. (The app previously carried a
  hand-uploaded `fonts/Cambria-Font-For-MAC.ttf`; it is not in the repo for licensing reasons.)
- `cfg.provider` is gone. `shims/preview-provider.tsx` now self-activates only on preview-card pages
  (it detects the card runtime's `__dsPreview`/`.ds-cell` markers), so the generated README and
  `.prompt.md` files no longer tell the design agent to wrap designs in `PreviewMotionProvider`.
- Slow networks: the staged validator waits 15 s for `networkidle` per card; image-heavy cards (galleries,
  Navigation, PhotoCategorySection) then time out at random. Warm the optimizer cache first
  (curl every `/_next/image?url=...` the previews reference) and, if it still flakes, raise the timeout
  in `.ds-sync/package-validate.mjs` (`timeout: 15000` -> `45000`) for that run. `MasonryGallery`'s
  preview was trimmed to six images for the same reason.
