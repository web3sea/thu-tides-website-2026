import * as React from 'react';
import { Field, FieldError, FieldLabel, Input, Textarea } from 'thu-tides-website';

export const SingleMessage = () => (
  <Field data-invalid="true" className="max-w-sm">
    <FieldLabel htmlFor="fe-email">Work email</FieldLabel>
    <Input id="fe-email" type="email" aria-invalid="true" defaultValue="hello@thutides" />
    <FieldError>Enter a valid email address.</FieldError>
  </Field>
);

export const FromErrorsArray = () => (
  <Field data-invalid="true" className="max-w-sm">
    <FieldLabel htmlFor="fe-dates">Preferred shoot window</FieldLabel>
    <Input id="fe-dates" aria-invalid="true" defaultValue="Sometime in the rainy season" />
    <FieldError
      errors={[
        { message: 'Enter a start and end date.' },
        { message: 'Shoots need at least three consecutive days on site.' },
        { message: 'Enter a start and end date.' },
      ]}
    />
  </Field>
);

export const OnTextarea = () => (
  <Field data-invalid="true" className="max-w-md">
    <FieldLabel htmlFor="fe-brief">Creative brief</FieldLabel>
    <Textarea id="fe-brief" aria-invalid="true" defaultValue="Photos" />
    <FieldError>Give us a little more: which spaces, what mood, and where the images will be used.</FieldError>
  </Field>
);
