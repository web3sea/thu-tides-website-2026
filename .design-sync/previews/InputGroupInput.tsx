import * as React from 'react';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from 'thu-tides-website';

export const Default = () => (
  <InputGroup className="max-w-sm">
    <InputGroupInput placeholder="Property name" />
  </InputGroup>
);

export const WithPrefix = () => (
  <InputGroup className="max-w-sm">
    <InputGroupAddon>
      <InputGroupText>+63</InputGroupText>
    </InputGroupAddon>
    <InputGroupInput type="tel" placeholder="917 000 0000" />
  </InputGroup>
);

export const Invalid = () => (
  <InputGroup className="max-w-sm">
    <InputGroupAddon>
      <InputGroupText>@</InputGroupText>
    </InputGroupAddon>
    <InputGroupInput aria-invalid="true" defaultValue="reconnect resort" />
  </InputGroup>
);

export const Disabled = () => (
  <InputGroup className="max-w-sm" data-disabled="true">
    <InputGroupAddon>
      <InputGroupText>USD</InputGroupText>
    </InputGroupAddon>
    <InputGroupInput disabled defaultValue="4,800" />
  </InputGroup>
);
