import * as React from 'react';
import { CollabSection } from 'thu-tides-website';

// The site renders CollabSection inside GigaLayout's slate-900 shell; the white
// text and glass card need that dark ground to read.
export const OnDark = () => (
  <div className="bg-slate-900">
    <CollabSection />
  </div>
);

export const OnGradient = () => (
  <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
    <CollabSection />
  </div>
);
