import * as React from 'react';
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet, Input } from 'thu-tides-website';

export const Legend = () => (
  <FieldSet className="max-w-md">
    <FieldLegend>Property details</FieldLegend>
    <FieldDescription>Where we will be flying the drone and getting in the water.</FieldDescription>
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="fleg-name">Property name</FieldLabel>
        <Input id="fleg-name" placeholder="Reconnect Resort" />
      </Field>
      <Field>
        <FieldLabel htmlFor="fleg-island">Island</FieldLabel>
        <Input id="fleg-island" placeholder="Buka Buka, Togean Islands" />
      </Field>
    </FieldGroup>
  </FieldSet>
);

export const LabelVariant = () => (
  <FieldSet className="max-w-md">
    <FieldLegend variant="label">Dive centre contact</FieldLegend>
    <FieldDescription>The person who will brief us on sites and conditions.</FieldDescription>
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="fleg-dm">Dive manager</FieldLabel>
        <Input id="fleg-dm" placeholder="Joel Reyes" />
      </Field>
      <Field>
        <FieldLabel htmlFor="fleg-phone">Phone</FieldLabel>
        <Input id="fleg-phone" type="tel" placeholder="+63 917 000 0000" />
      </Field>
    </FieldGroup>
  </FieldSet>
);
