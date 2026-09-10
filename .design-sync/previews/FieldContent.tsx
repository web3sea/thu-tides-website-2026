import * as React from 'react';
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, Input } from 'thu-tides-website';

export const Horizontal = () => (
  <Field orientation="horizontal" className="max-w-lg">
    <FieldContent>
      <FieldLabel htmlFor="fc-villas">Overwater villas</FieldLabel>
      <FieldDescription>How many we should feature in the aerial sequence.</FieldDescription>
    </FieldContent>
    <Input id="fc-villas" type="number" defaultValue="6" className="w-20" />
  </Field>
);

export const Stacked = () => (
  <FieldGroup className="max-w-lg">
    <Field orientation="horizontal">
      <FieldContent>
        <FieldLabel htmlFor="fc-sites">Dive sites</FieldLabel>
        <FieldDescription>Sites within a 30-minute boat ride.</FieldDescription>
      </FieldContent>
      <Input id="fc-sites" type="number" defaultValue="12" className="w-20" />
    </Field>
    <Field orientation="horizontal">
      <FieldContent>
        <FieldLabel htmlFor="fc-vis">Typical visibility</FieldLabel>
        <FieldDescription>Metres, in the season you want us there.</FieldDescription>
      </FieldContent>
      <Input id="fc-vis" defaultValue="25 to 30 m" className="w-32" />
    </Field>
  </FieldGroup>
);

export const Responsive = () => (
  <FieldGroup className="max-w-2xl">
    <Field orientation="responsive">
      <FieldContent>
        <FieldLabel htmlFor="fc-drone">Drone permissions</FieldLabel>
        <FieldDescription>Some marine parks in Indonesia require a permit letter. We handle the paperwork with your help.</FieldDescription>
      </FieldContent>
      <Input id="fc-drone" placeholder="Togean National Park office" className="w-64" />
    </Field>
  </FieldGroup>
);
