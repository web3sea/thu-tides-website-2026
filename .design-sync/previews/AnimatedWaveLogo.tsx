import * as React from 'react';
import { AnimatedWaveLogo } from 'thu-tides-website';

export const Default = () => <AnimatedWaveLogo />;

export const IconOnly = () => <AnimatedWaveLogo showText={false} iconClassName="w-12 h-12" />;

export const NavigationLockup = () => (
  <div className="flex items-center justify-between rounded-lg bg-slate-900 px-6 py-4 text-white">
    <AnimatedWaveLogo iconClassName="w-9 h-9" textClassName="text-lg font-semibold tracking-tight" />
    <nav className="flex gap-6 text-sm text-white/70">
      <span>Portfolio</span>
      <span>Case studies</span>
      <span>Contact</span>
    </nav>
  </div>
);

export const Large = () => (
  <AnimatedWaveLogo iconClassName="w-16 h-16" textClassName="text-4xl font-bold tracking-tight" />
);
