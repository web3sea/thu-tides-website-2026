import * as React from 'react';
import { Field, FieldDescription, FieldLabel, FieldTitle, Input } from 'thu-tides-website';

export const Default = () => (
  <Field className="max-w-sm">
    <FieldLabel htmlFor="fl-resort">Resort name</FieldLabel>
    <Input id="fl-resort" placeholder="Evolution Divers, Malapascua" />
  </Field>
);

export const WithDescription = () => (
  <Field className="max-w-sm">
    <FieldLabel htmlFor="fl-instagram">Instagram handle</FieldLabel>
    <Input id="fl-instagram" placeholder="@reconnectresort" />
    <FieldDescription>We tag the property in every underwater and aerial post.</FieldDescription>
  </Field>
);

export const Disabled = () => (
  <Field data-disabled="true" className="max-w-sm">
    <FieldLabel htmlFor="fl-region">Region</FieldLabel>
    <Input id="fl-region" disabled defaultValue="Central Sulawesi, Indonesia" />
  </Field>
);

export const AsCardWrapper = () => (
  <FieldLabel htmlFor="fl-package" className="max-w-md">
    <Field>
      <FieldTitle>Signature package</FieldTitle>
      <FieldDescription>Three days on site. Aerial, underwater and lifestyle coverage with a 60-image edited gallery.</FieldDescription>
      <Input id="fl-package" defaultValue="From USD 4,800 or a 7-night stay" readOnly />
    </Field>
  </FieldLabel>
);
