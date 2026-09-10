import * as React from 'react';
import { Badge, Button, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'thu-tides-website';


export const BadgeAction = () => (
  <Card className="max-w-sm">
    <CardHeader>
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

export const ButtonAction = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Reconnect Resort</CardTitle>
      <CardDescription>Buka Buka Island, Indonesia</CardDescription>
      <CardAction>
        <Button variant="outline" size="sm">Open</Button>
      </CardAction>
    </CardHeader>
    <CardContent>
      <p>Three-day content production covering the dive centre, villas and the house reef.</p>
    </CardContent>
  </Card>
);

export const ActionWithTitleOnly = () => (
  <Card size="sm" className="max-w-xs">
    <CardHeader>
      <CardTitle>Munduk Heaven</CardTitle>
      <CardAction>
        <Badge>New</Badge>
      </CardAction>
    </CardHeader>
    <CardContent>
      <p>Cliffside villas in the Bali highlands.</p>
    </CardContent>
  </Card>
);
