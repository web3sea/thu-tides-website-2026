import * as React from 'react';
import { Separator } from 'thu-tides-website';

// Base UI 1.x emits data-orientation="horizontal|vertical" while the component's
// classes target data-horizontal:/data-vertical:, so the bare separator has no
// thickness (same on the live site). Explicit h-px / w-px makes it visible here.

export const Horizontal = () => (
  <div className="max-w-sm">
    <div>
      <h4 className="text-sm font-medium">Reconnect Resort</h4>
      <p className="text-sm text-muted-foreground">Buka Buka Island, Central Sulawesi</p>
    </div>
    <Separator className="my-4 h-px" />
    <p className="text-sm">Three-day aerial and underwater content production for the 2026 season.</p>
  </div>
);

export const Vertical = () => (
  <div className="flex h-5 items-center gap-4 text-sm">
    <span>Aerial</span>
    <Separator orientation="vertical" className="w-px self-stretch" />
    <span>Underwater</span>
    <Separator orientation="vertical" className="w-px self-stretch" />
    <span>Lifestyle</span>
    <Separator orientation="vertical" className="w-px self-stretch" />
    <span>Architecture</span>
  </div>
);

export const InList = () => (
  <ul className="max-w-sm text-sm">
    <li className="flex justify-between py-2"><span>Evolution Divers</span><span className="text-muted-foreground">Malapascua, PH</span></li>
    <Separator />
    <li className="flex justify-between py-2"><span>Reconnect Resort</span><span className="text-muted-foreground">Buka Buka, ID</span></li>
    <Separator />
    <li className="flex justify-between py-2"><span>Siladen Resort</span><span className="text-muted-foreground">Bunaken, ID</span></li>
  </ul>
);

export const Decorative = () => (
  <div className="max-w-sm text-center">
    <p className="text-xs uppercase tracking-widest text-muted-foreground">Our locations</p>
    <Separator className="mx-auto my-3 h-px w-12 bg-brand-cerulean" />
    <p className="text-sm">Indonesia and the Philippines</p>
  </div>
);
