import * as React from 'react';
import { Badge, Button, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'thu-tides-website';


export const Default = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Reconnect Resort</CardTitle>
      <CardDescription>Buka Buka Island, Indonesia</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Three-day content production covering the dive centre, villas and the house reef.</p>
    </CardContent>
  </Card>
);

export const LargeTitle = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle className="text-2xl font-semibold tracking-tight">Underwater portfolio</CardTitle>
      <CardDescription>Reef, pelagic and macro work</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Thresher sharks, sardine runs and gorgonian walls across the Visayas.</p>
    </CardContent>
  </Card>
);

export const LongTitle = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Aerial and underwater content production for a barefoot-luxury resort in the Togean Islands</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Case study, 2026.</p>
    </CardContent>
  </Card>
);
