import * as React from 'react';
import { Field, FieldContent, FieldDescription, FieldLabel, Input } from 'thu-tides-website';

export const BelowInput = () => (
  <Field className="max-w-sm">
    <FieldLabel htmlFor="fd-website">Property website</FieldLabel>
    <Input id="fd-website" type="url" placeholder="https://www.reconnectresort.com" />
    <FieldDescription>We study the current imagery before proposing a shot list.</FieldDescription>
  </Field>
);

export const AboveInput = () => (
  <Field className="max-w-sm">
    <FieldLabel htmlFor="fd-depth">Deepest dive site</FieldLabel>
    <FieldDescription>Metres. Helps us pick the right housing and strobes for the shoot.</FieldDescription>
    <Input id="fd-depth" type="number" placeholder="30" />
  </Field>
);

export const WithLink = () => (
  <Field className="max-w-sm">
    <FieldLabel htmlFor="fd-budget">Content budget</FieldLabel>
    <Input id="fd-budget" placeholder="USD 5,000" />
    <FieldDescription>
      Not sure yet? See how a <a href="#barter">stay-for-content partnership</a> works instead.
    </FieldDescription>
  </Field>
);

export const Horizontal = () => (
  <Field orientation="horizontal" className="max-w-lg">
    <FieldContent>
      <FieldLabel htmlFor="fd-nights">Complimentary nights</FieldLabel>
      <FieldDescription>Barter partners host the crew for the duration of the shoot plus one buffer night for weather.</FieldDescription>
    </FieldContent>
    <Input id="fd-nights" type="number" defaultValue="4" className="w-20" />
  </Field>
);
