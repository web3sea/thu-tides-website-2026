import * as React from 'react';
import { Field, FieldContent, FieldDescription, FieldTitle, Input } from 'thu-tides-website';

export const Default = () => (
  <Field className="max-w-md">
    <FieldTitle>Aerial package</FieldTitle>
    <FieldDescription>Drone stills and video of the property, beach and reef from above.</FieldDescription>
    <Input placeholder="Add a note for the pilot" />
  </Field>
);

export const InHorizontalField = () => (
  <Field orientation="horizontal" className="max-w-lg">
    <FieldContent>
      <FieldTitle>Underwater package</FieldTitle>
      <FieldDescription>Two dives a day on the house reef and signature sites, with the resort's own guides in frame.</FieldDescription>
    </FieldContent>
    <Input defaultValue="4 dives" className="w-28" />
  </Field>
);

export const Disabled = () => (
  <Field data-disabled="true" className="max-w-md">
    <FieldTitle>Lifestyle package</FieldTitle>
    <FieldDescription>Not available for this season: our lifestyle crew is fully booked until October.</FieldDescription>
    <Input disabled placeholder="Join the waitlist" />
  </Field>
);
