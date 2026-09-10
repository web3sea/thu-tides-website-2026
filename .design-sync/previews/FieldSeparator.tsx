import * as React from 'react';
import { Field, FieldGroup, FieldLabel, FieldSeparator, Input } from 'thu-tides-website';

export const Plain = () => (
  <FieldGroup className="max-w-md">
    <Field>
      <FieldLabel htmlFor="fs-property">Property</FieldLabel>
      <Input id="fs-property" defaultValue="Reconnect Resort" />
    </Field>
    <FieldSeparator />
    <Field>
      <FieldLabel htmlFor="fs-contact">Main contact</FieldLabel>
      <Input id="fs-contact" placeholder="General manager" />
    </Field>
  </FieldGroup>
);

export const WithText = () => (
  <FieldGroup className="max-w-md">
    <Field>
      <FieldLabel htmlFor="fs-email">Email</FieldLabel>
      <Input id="fs-email" type="email" placeholder="gm@evolutiondivers.com" />
    </Field>
    <FieldSeparator>or</FieldSeparator>
    <Field>
      <FieldLabel htmlFor="fs-whatsapp">WhatsApp</FieldLabel>
      <Input id="fs-whatsapp" type="tel" placeholder="+63 917 000 0000" />
    </Field>
  </FieldGroup>
);
