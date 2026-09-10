import * as React from 'react';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, InputGroupTextarea } from 'thu-tides-website';

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
);

export const Prefix = () => (
  <InputGroup className="max-w-sm">
    <InputGroupAddon>
      <InputGroupText>@</InputGroupText>
    </InputGroupAddon>
    <InputGroupInput placeholder="reconnectresort" />
  </InputGroup>
);

export const Suffix = () => (
  <InputGroup className="max-w-sm">
    <InputGroupInput type="number" placeholder="25" />
    <InputGroupAddon align="inline-end">
      <InputGroupText>m visibility</InputGroupText>
    </InputGroupAddon>
  </InputGroup>
);

export const WithIcon = () => (
  <InputGroup className="max-w-sm">
    <InputGroupAddon>
      <InputGroupText>
        <GlobeIcon />
        https://
      </InputGroupText>
    </InputGroupAddon>
    <InputGroupInput placeholder="www.evolutiondivers.com" />
  </InputGroup>
);

export const CharacterCount = () => (
  <InputGroup className="max-w-md">
    <InputGroupTextarea defaultValue="Looking for aerials of the beach front and underwater coverage of Monad Shoal." />
    <InputGroupAddon align="block-end">
      <InputGroupText className="ml-auto">78 / 600 characters</InputGroupText>
    </InputGroupAddon>
  </InputGroup>
);
