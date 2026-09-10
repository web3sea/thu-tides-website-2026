import * as React from 'react';
import { Button, Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldSeparator, Input, Textarea } from 'thu-tides-website';

export const ContactForm = () => (
  <FieldGroup className="max-w-md">
    <Field>
      <FieldLabel htmlFor="fg-name">Your name</FieldLabel>
      <Input id="fg-name" placeholder="Maria Santos" />
    </Field>
    <Field>
      <FieldLabel htmlFor="fg-property">Property</FieldLabel>
      <Input id="fg-property" placeholder="Evolution Divers, Malapascua" />
    </Field>
    <Field>
      <FieldLabel htmlFor="fg-message">What are you looking for?</FieldLabel>
      <Textarea id="fg-message" placeholder="New hero imagery for the website and a reel of the thresher shark dives." />
      <FieldDescription>We reply within two working days, usually from somewhere with patchy signal.</FieldDescription>
    </Field>
    <Button variant="brand" type="submit">Send enquiry</Button>
  </FieldGroup>
);

export const WithSeparator = () => (
  <FieldGroup className="max-w-md">
    <Field>
      <FieldLabel htmlFor="fg-email">Work email</FieldLabel>
      <Input id="fg-email" type="email" placeholder="gm@reconnectresort.com" />
    </Field>
    <FieldSeparator>or reach us on</FieldSeparator>
    <Field>
      <FieldLabel htmlFor="fg-whatsapp">WhatsApp</FieldLabel>
      <Input id="fg-whatsapp" type="tel" placeholder="+62 812 0000 0000" />
    </Field>
  </FieldGroup>
);

export const ResponsiveFields = () => (
  <FieldGroup className="max-w-2xl">
    <Field orientation="responsive">
      <FieldContent>
        <FieldLabel htmlFor="fg-rooms">Rooms</FieldLabel>
        <FieldDescription>Total keys on the property.</FieldDescription>
      </FieldContent>
      <Input id="fg-rooms" type="number" defaultValue="18" className="w-24" />
    </Field>
    <Field orientation="responsive">
      <FieldContent>
        <FieldLabel htmlFor="fg-season">Peak season</FieldLabel>
        <FieldDescription>We schedule shoots for the calm-water months.</FieldDescription>
      </FieldContent>
      <Input id="fg-season" defaultValue="April to October" className="w-48" />
    </Field>
  </FieldGroup>
);
