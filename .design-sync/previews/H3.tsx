import * as React from 'react';
import { H3 } from 'thu-tides-website';

export const Default = () => <H3>Reconnect Resort, Buka Buka Island</H3>;

export const Muted = () => <H3 className="text-muted-foreground">Evolution Divers, Malapascua</H3>;

export const Stacked = () => (
  <div className="space-y-2">
    <H3>Aerial photography</H3>
    <H3>Underwater photography</H3>
    <H3>Resort storytelling</H3>
  </div>
);
