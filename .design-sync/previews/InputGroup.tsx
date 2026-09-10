import * as React from 'react';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from 'thu-tides-website';

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
);

export const WithIcon = () => (
  <InputGroup className="max-w-sm">
    <InputGroupAddon>
      <SearchIcon />
    </InputGroupAddon>
    <InputGroupInput placeholder="Search dive resorts" />
  </InputGroup>
);

export const WithPrefixAndSuffix = () => (
  <InputGroup className="max-w-sm">
    <InputGroupAddon>
      <InputGroupText>https://</InputGroupText>
    </InputGroupAddon>
    <InputGroupInput placeholder="www.reconnectresort.com" />
    <InputGroupAddon align="inline-end">
      <InputGroupText>.com</InputGroupText>
    </InputGroupAddon>
  </InputGroup>
);

export const WithButton = () => (
  <InputGroup className="max-w-sm">
    <InputGroupInput type="email" placeholder="gm@evolutiondivers.com" />
    <InputGroupAddon align="inline-end">
      <InputGroupButton variant="brand">Subscribe</InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
);

export const Invalid = () => (
  <InputGroup className="max-w-sm">
    <InputGroupAddon>
      <InputGroupText>+62</InputGroupText>
    </InputGroupAddon>
    <InputGroupInput type="tel" aria-invalid="true" defaultValue="812 00" />
  </InputGroup>
);

export const WithTextarea = () => (
  <InputGroup className="max-w-md">
    <InputGroupTextarea placeholder="Describe the property, the season and the imagery you need." />
    <InputGroupAddon align="block-end">
      <InputGroupText>0 / 600</InputGroupText>
      <InputGroupButton variant="brand" size="sm" className="ml-auto">Send</InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
);
