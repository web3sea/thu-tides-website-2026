import * as React from 'react';
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel, Input, Textarea } from 'thu-tides-website';

export const Vertical = () => (
  <Field className="max-w-sm">
    <FieldLabel htmlFor="field-property">Property name</FieldLabel>
    <Input id="field-property" placeholder="Reconnect Resort, Buka Buka Island" />
    <FieldDescription>The hotel or dive resort we will be shooting.</FieldDescription>
  </Field>
);

export const Horizontal = () => (
  <Field orientation="horizontal" className="max-w-md">
    <FieldContent>
      <FieldLabel htmlFor="field-rooms">Number of rooms</FieldLabel>
      <FieldDescription>Boutique properties under 20 rooms qualify for the barter partnership.</FieldDescription>
    </FieldContent>
    <Input id="field-rooms" type="number" defaultValue="14" className="w-24" />
  </Field>
);

export const Invalid = () => (
  <Field data-invalid="true" className="max-w-sm">
    <FieldLabel htmlFor="field-email">Work email</FieldLabel>
    <Input id="field-email" type="email" aria-invalid="true" defaultValue="reservations@evolution" />
    <FieldError>Enter a complete email address so we can send the proposal.</FieldError>
  </Field>
);

export const Disabled = () => (
  <Field data-disabled="true" className="max-w-sm">
    <FieldLabel htmlFor="field-dates">Shoot dates</FieldLabel>
    <Input id="field-dates" disabled defaultValue="12 to 15 March 2026" />
    <FieldDescription>Dates are locked once the flights to Manado are booked.</FieldDescription>
  </Field>
);

export const WithTextarea = () => (
  <Field className="max-w-md">
    <FieldLabel htmlFor="field-brief">Creative brief</FieldLabel>
    <Textarea id="field-brief" placeholder="Overwater villas at sunrise, the house reef with the resident turtles, drone passes over the jetty..." />
    <FieldDescription>Tell us what the property needs: stills, aerials, underwater, or all three.</FieldDescription>
  </Field>
);
