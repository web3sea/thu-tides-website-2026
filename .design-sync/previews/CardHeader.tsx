import * as React from 'react';
import { Badge, Button, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'thu-tides-website';


export const TitleAndDescription = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Reconnect Resort</CardTitle>
      <CardDescription>Buka Buka Island, Indonesia</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Three-day content production covering the dive centre, overwater villas and the house reef.</p>
    </CardContent>
  </Card>
);

export const WithActionAndBorder = () => (
  <Card className="max-w-sm">
    <CardHeader className="border-b">
      <CardTitle>Evolution Divers</CardTitle>
      <CardDescription>Malapascua, Philippines</CardDescription>
      <CardAction>
        <Badge variant="secondary">Dive resort</Badge>
      </CardAction>
    </CardHeader>
    <CardContent>
      <p>Underwater and aerial photography package for the 2026 season launch.</p>
    </CardContent>
  </Card>
);

export const TitleOnly = () => (
  <Card size="sm" className="max-w-xs">
    <CardHeader>
      <CardTitle>Munduk Heaven</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Cliffside villas in the Bali highlands.</p>
    </CardContent>
  </Card>
);
