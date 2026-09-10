import * as React from 'react';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from 'thu-tides-website';

const PinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);

export const InlineStart = () => (
  <InputGroup className="max-w-sm">
    <InputGroupAddon>
      <PinIcon />
    </InputGroupAddon>
    <InputGroupInput placeholder="Malapascua, Cebu" />
  </InputGroup>
);

export const InlineEnd = () => (
  <InputGroup className="max-w-sm">
    <InputGroupInput type="number" placeholder="30" />
    <InputGroupAddon align="inline-end">
      <InputGroupText>metres</InputGroupText>
    </InputGroupAddon>
  </InputGroup>
);

export const BothSides = () => (
  <InputGroup className="max-w-sm">
    <InputGroupAddon>
      <InputGroupText>USD</InputGroupText>
    </InputGroupAddon>
    <InputGroupInput placeholder="4,800" />
    <InputGroupAddon align="inline-end">
      <InputGroupText>per shoot</InputGroupText>
    </InputGroupAddon>
  </InputGroup>
);

export const BlockStart = () => (
  <InputGroup className="max-w-md">
    <InputGroupAddon align="block-start">
      <InputGroupText>Creative brief</InputGroupText>
    </InputGroupAddon>
    <InputGroupTextarea placeholder="Aerials of the overwater villas and underwater coverage of the house reef." />
  </InputGroup>
);

export const BlockEnd = () => (
  <InputGroup className="max-w-md">
    <InputGroupTextarea defaultValue="We are a 14-room dive resort on Malapascua looking for new hero imagery." />
    <InputGroupAddon align="block-end">
      <InputGroupText>84 / 600</InputGroupText>
      <InputGroupButton variant="brand" size="sm" className="ml-auto">Send</InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
);
