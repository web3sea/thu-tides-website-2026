import * as React from 'react';
import { Badge, Button, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'thu-tides-website';

export const Basic = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Reconnect Resort</CardTitle>
      <CardDescription>Buka Buka Island, Indonesia</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Three-day content production covering the dive centre, overwater villas and the house reef at golden hour.</p>
    </CardContent>
    <CardFooter className="gap-2">
      <Button variant="brand" size="sm">View case study</Button>
      <Button variant="ghost" size="sm">Share</Button>
    </CardFooter>
  </Card>
);

export const WithAction = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Evolution Divers</CardTitle>
      <CardDescription>Malapascua, Philippines</CardDescription>
      <CardAction>
        <Badge variant="secondary">Dive resort</Badge>
      </CardAction>
    </CardHeader>
    <CardContent>
      <p>Underwater and aerial photography package for the resort's 2026 season launch.</p>
    </CardContent>
  </Card>
);

export const WithImage = () => (
  <Card className="max-w-sm">
    <img src="https://www.thutides.com/reconnect_buka_buka.webp" alt="Aerial view of Reconnect Resort" className="aspect-[4/3] w-full object-cover" />
    <CardHeader>
      <CardTitle>Aerial storytelling</CardTitle>
      <CardDescription>Drone coverage of coastal properties</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Establishing shots that place the property in its landscape: reef, beach and jungle in one frame.</p>
    </CardContent>
  </Card>
);

export const Small = () => (
  <Card size="sm" className="max-w-xs">
    <CardHeader>
      <CardTitle>Barter partnership</CardTitle>
      <CardDescription>Stay in exchange for content</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Ideal for boutique properties with fewer than 20 rooms.</p>
    </CardContent>
  </Card>
);
