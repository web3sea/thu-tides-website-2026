import * as React from 'react';
import { P } from 'thu-tides-website';

export const Default = () => (
  <P className="max-w-prose">
    We photographed the dive centre at first light, the overwater villas through the afternoon and the house reef at golden hour.
  </P>
);

export const Paragraphs = () => (
  <div className="max-w-prose space-y-4">
    <P>Reconnect Resort sits on Buka Buka Island in the Togean archipelago, a day's travel from the nearest airport.</P>
    <P>The brief was to show the property exactly as guests remember it: calm, bright and unposed.</P>
    <P>Every image was delivered colour-graded and cropped for web, print and social in one set.</P>
  </div>
);

export const Muted = () => (
  <P className="max-w-prose text-muted-foreground">Delivery in 10 working days. Raw files available on request.</P>
);
