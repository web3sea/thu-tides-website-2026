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

export const LongDescription = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Barter partnership</CardTitle>
      <CardDescription>
        A stay in exchange for a full content set: aerial, underwater and resort photography delivered colour-graded for web, print and social.
      </CardDescription>
    </CardHeader>
    <CardFooter>
      <Button variant="brand" size="sm">Enquire</Button>
    </CardFooter>
  </Card>
);

export const DescriptionWithAction = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Evolution Divers</CardTitle>
      <CardDescription>Thresher shark season, November to May</CardDescription>
      <CardAction>
        <Badge variant="secondary">Philippines</Badge>
      </CardAction>
    </CardHeader>
  </Card>
);
