// design-sync shim for `next/image`: the Next.js image optimizer needs the
// Next runtime, which a claude.ai/design bundle does not have. Renders a plain
// <img> with the same props surface the site uses (fill, priority, sizes, quality).
// Root-relative asset paths ("/DJI_aerial_hero.webp") point at files in public/,
// which no preview or design can serve - resolve them against the production
// site so the real photography renders.
import * as React from 'react';

export const ASSET_ORIGIN = 'https://www.thutides.com';
// Route through the site's Next image optimizer: the originals in public/ run to
// 9-11 MB each, which times out the capture harness and would bloat every design.
export const assetUrl = (src: string, width = 1200) =>
  src.startsWith('/') ? `${ASSET_ORIGIN}/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75` : src;

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string | { src: string };
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  placeholder?: string;
  blurDataURL?: string;
  unoptimized?: boolean;
  loader?: unknown;
};

const Image = React.forwardRef<HTMLImageElement, Props>(function Image(
  { src, fill, priority, quality, placeholder, blurDataURL, unoptimized, loader, style, alt = '', ...rest },
  ref,
) {
  const resolved = assetUrl(typeof src === 'string' ? src : src?.src ?? '');
  const fillStyle: React.CSSProperties | undefined = fill
    ? { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: (style?.objectFit as any) ?? 'cover' }
    : undefined;
  return <img ref={ref} src={resolved} alt={alt} loading={priority ? 'eager' : rest.loading ?? 'eager'} /* eager by default: lazy off-screen images never decode in the capture harness, and design previews are small */ style={{ ...fillStyle, ...style }} {...rest} />;
});

export default Image;
