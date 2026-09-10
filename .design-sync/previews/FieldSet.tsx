import * as React from 'react';
import { Button, Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet, Input, Textarea } from 'thu-tides-website';

export const Basic = () => (
  <FieldSet className="max-w-md">
    <FieldLegend>Property details</FieldLegend>
    <FieldDescription>Tell us where we are heading.</FieldDescription>
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="fset-name">Property name</FieldLabel>
        <Input id="fset-name" placeholder="Evolution Divers" />
      </Field>
      <Field>
        <FieldLabel htmlFor="fset-location">Location</FieldLabel>
        <Input id="fset-location" placeholder="Malapascua, Cebu, Philippines" />
      </Field>
    </FieldGroup>
  </FieldSet>
);

export const BookingForm = () => (
  <form className="max-w-lg flex flex-col gap-8">
    <FieldSet>
      <FieldLegend>Contact</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="fset-contact">Your name</FieldLabel>
          <Input id="fset-contact" placeholder="Maria Santos" />
        </Field>
        <Field>
          <FieldLabel htmlFor="fset-email">Work email</FieldLabel>
          <Input id="fset-email" type="email" placeholder="maria@reconnectresort.com" />
        </Field>
      </FieldGroup>
    </FieldSet>
    <FieldSeparator />
    <FieldSet>
      <FieldLegend>The shoot</FieldLegend>
      <FieldDescription>Rough dates are fine. We plan around tides and monsoon.</FieldDescription>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="fset-window">Preferred window</FieldLabel>
          <Input id="fset-window" placeholder="Late April 2026" />
        </Field>
        <Field>
          <FieldLabel htmlFor="fset-brief">Brief</FieldLabel>
          <Textarea id="fset-brief" placeholder="Aerials of the overwater villas, the house reef, and a short reel for Instagram." />
        </Field>
      </FieldGroup>
    </FieldSet>
    <Button variant="brand" type="submit" className="w-fit">Request a proposal</Button>
  </form>
);

export const Disabled = () => (
  <FieldSet disabled className="max-w-md">
    <FieldLegend>Confirmed itinerary</FieldLegend>
    <FieldDescription>Locked after flights are booked. Contact us to change.</FieldDescription>
    <FieldGroup>
      <Field data-disabled="true">
        <FieldLabel htmlFor="fset-arrive">Arrival</FieldLabel>
        <Input id="fset-arrive" disabled defaultValue="12 March 2026, Ampana" />
      </Field>
      <Field data-disabled="true">
        <FieldLabel htmlFor="fset-depart">Departure</FieldLabel>
        <Input id="fset-depart" disabled defaultValue="16 March 2026, Ampana" />
      </Field>
    </FieldGroup>
  </FieldSet>
);
