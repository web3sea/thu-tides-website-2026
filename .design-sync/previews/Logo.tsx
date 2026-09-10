import * as React from 'react';
import { Logo } from 'thu-tides-website';

export const IconOnly = () => (
  <div className="inline-flex rounded-lg bg-slate-900 p-6">
    <Logo iconClassName="w-24 h-12" />
  </div>
);

export const WithWordmark = () => (
  <div className="inline-flex rounded-lg bg-slate-900 p-6 text-white">
    <Logo showText iconClassName="w-20 h-10" />
  </div>
);

export const Sizes = () => (
  <div className="flex items-end gap-8 rounded-lg bg-slate-900 p-6">
    <Logo iconClassName="w-12 h-6" />
    <Logo iconClassName="w-20 h-10" />
    <Logo iconClassName="w-32 h-16" />
  </div>
);

export const OnLight = () => (
  <div className="inline-flex rounded-lg bg-muted p-6">
    <Logo showText iconClassName="w-20 h-10" textClassName="text-xl font-semibold tracking-tight" />
  </div>
);
