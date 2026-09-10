import * as React from 'react';
import { Input, Label, Textarea } from 'thu-tides-website';

export const Default = () => (
  <Label>Property name</Label>
);

export const WithInput = () => (
  <div className="flex flex-col gap-2 max-w-sm">
    <Label htmlFor="lb-resort">Resort name</Label>
    <Input id="lb-resort" placeholder="Reconnect Resort" />
  </div>
);

export const WithTextarea = () => (
  <div className="flex flex-col gap-2 max-w-md">
    <Label htmlFor="lb-brief">Shot list notes</Label>
    <Textarea id="lb-brief" placeholder="Sunrise on the jetty, the dive boat leaving, turtles on the house reef." />
  </div>
);

export const DisabledPeer = () => (
  <div className="flex flex-col gap-2 max-w-sm">
    <Input id="lb-locked" disabled defaultValue="Togean Islands, Indonesia" className="peer" />
    <Label htmlFor="lb-locked">Destination (locked)</Label>
  </div>
);
