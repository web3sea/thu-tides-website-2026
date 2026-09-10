import * as React from 'react';
import { Badge, Button, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'thu-tides-website';


export const Actions = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Reconnect Resort</CardTitle>
      <CardDescription>Buka Buka Island, Indonesia</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Three-day content production covering the dive centre, villas and the house reef.</p>
    </CardContent>
    <CardFooter className="gap-2">
      <Button variant="brand" size="sm">View case study</Button>
      <Button variant="ghost" size="sm">Share</Button>
    </CardFooter>
  </Card>
);

export const SpaceBetweenWithBorder = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Evolution Divers</CardTitle>
      <CardDescription>Malapascua, Philippines</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Underwater and aerial photography package for the 2026 season launch.</p>
    </CardContent>
    <CardFooter className="justify-between border-t">
      <span className="text-sm text-muted-foreground">Delivered March 2026</span>
      <Badge>Published</Badge>
    </CardFooter>
  </Card>
);

export const FullWidthButton = () => (
  <Card size="sm" className="max-w-xs">
    <CardHeader>
      <CardTitle>Barter partnership</CardTitle>
      <CardDescription>Stay in exchange for content</CardDescription>
    </CardHeader>
    <CardFooter>
      <Button variant="brand" className="w-full">Enquire</Button>
    </CardFooter>
  </Card>
);
