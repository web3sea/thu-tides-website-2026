import * as React from 'react';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupTextarea } from 'thu-tides-website';

export const Default = () => (
  <InputGroup className="max-w-md">
    <InputGroupTextarea placeholder="Tell us about the property and the imagery you need." />
  </InputGroup>
);

export const WithFooter = () => (
  <InputGroup className="max-w-md">
    <InputGroupTextarea placeholder="Aerials of the overwater villas, the house reef, and a short reel for Instagram." />
    <InputGroupAddon align="block-end">
      <InputGroupText>0 / 600</InputGroupText>
      <InputGroupButton variant="brand" size="sm" className="ml-auto">Send enquiry</InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
);

export const WithHeader = () => (
  <InputGroup className="max-w-md">
    <InputGroupAddon align="block-start">
      <InputGroupText>Shot list notes</InputGroupText>
    </InputGroupAddon>
    <InputGroupTextarea defaultValue="Sunrise on the jetty. Dive boat leaving at 07:00. Turtles on the house reef around 10:00 when the light comes through." />
  </InputGroup>
);

export const Invalid = () => (
  <InputGroup className="max-w-md">
    <InputGroupTextarea aria-invalid="true" defaultValue="Photos" />
    <InputGroupAddon align="block-end">
      <InputGroupText>Too short: tell us a little more.</InputGroupText>
    </InputGroupAddon>
  </InputGroup>
);
