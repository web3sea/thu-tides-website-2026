import * as React from 'react';
import { Label, Textarea } from 'thu-tides-website';

export const Default = () => (
  <Textarea className="max-w-md" placeholder="Tell us about the property and what imagery you need." />
);

export const WithLabel = () => (
  <div className="flex flex-col gap-2 max-w-md">
    <Label htmlFor="ta-brief">Creative brief</Label>
    <Textarea id="ta-brief" placeholder="Overwater villas at sunrise, the house reef with the resident turtles, a drone pass along the jetty." />
  </div>
);

export const WithContent = () => (
  <Textarea
    className="max-w-md"
    defaultValue={
      'We are a 14-room dive resort on Malapascua. Our thresher shark dives are the main draw but our current photos do not show the resort itself. We would like aerials of the beach front, a set of room interiors, and underwater coverage of Monad Shoal at first light.'
    }
  />
);

export const Invalid = () => (
  <Textarea className="max-w-md" aria-invalid="true" defaultValue="Photos" />
);

export const Disabled = () => (
  <Textarea className="max-w-md" disabled defaultValue="Brief locked. The shot list has been approved and sent to the crew." />
);
