import * as React from 'react';
import { Badge, Button, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'thu-tides-website';


export const Paragraph = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Reconnect Resort</CardTitle>
      <CardDescription>Buka Buka Island, Indonesia</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Three-day content production covering the dive centre, overwater villas and the house reef at golden hour.</p>
    </CardContent>
  </Card>
);

export const DefinitionList = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Production details</CardTitle>
    </CardHeader>
    <CardContent>
      <dl className="grid grid-cols-2 gap-2 text-sm">
        <dt className="text-muted-foreground">Location</dt><dd>Malapascua, Philippines</dd>
        <dt className="text-muted-foreground">Days on site</dt><dd>4</dd>
        <dt className="text-muted-foreground">Deliverables</dt><dd>120 images, 6 reels</dd>
        <dt className="text-muted-foreground">Turnaround</dt><dd>10 working days</dd>
      </dl>
    </CardContent>
  </Card>
);

export const ImageContent = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Aerial storytelling</CardTitle>
      <CardDescription>Drone coverage of coastal properties</CardDescription>
    </CardHeader>
    <CardContent>
      <img src="https://www.thutides.com/_next/image?url=%2FDJ_aerial_reconnect.webp&w=1200&q=75" alt="Aerial view of Reconnect Resort" className="aspect-video w-full rounded-lg object-cover" />
    </CardContent>
  </Card>
);
