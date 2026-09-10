import * as React from 'react';
import { Quote } from 'thu-tides-website';

export const Default = () => (
  <Quote className="max-w-prose">
    "Thu captured the resort exactly as our guests remember it, calm, bright and completely unposed."
  </Quote>
);

export const WithAttribution = () => (
  <figure className="max-w-prose">
    <Quote>"The underwater set gave us a full season of social content from a single week."</Quote>
    <figcaption className="mt-3 text-sm text-muted-foreground">Ari, General Manager, Reconnect Resort</figcaption>
  </figure>
);

export const Centered = () => (
  <Quote className="max-w-prose text-center">"Work that feels as unhurried as the island itself."</Quote>
);
