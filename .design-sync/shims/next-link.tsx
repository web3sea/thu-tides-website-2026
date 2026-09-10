// design-sync shim for `next/link`: a plain anchor. Client-side routing is a
// Next runtime concern and does not apply inside a design preview.
import * as React from 'react';

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string | { pathname?: string; hash?: string };
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  legacyBehavior?: boolean;
};

const Link = React.forwardRef<HTMLAnchorElement, Props>(function Link(
  { href, prefetch, replace, scroll, shallow, passHref, legacyBehavior, children, ...rest },
  ref,
) {
  const h = typeof href === 'string' ? href : `${href.pathname ?? ''}${href.hash ?? ''}`;
  return <a ref={ref} href={h} {...rest}>{children}</a>;
});

export default Link;
