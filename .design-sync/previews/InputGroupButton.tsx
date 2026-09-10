import * as React from 'react';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupTextarea } from 'thu-tides-website';

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
);
const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
);

export const TextButton = () => (
  <InputGroup className="max-w-sm">
    <InputGroupInput type="email" placeholder="gm@reconnectresort.com" />
    <InputGroupAddon align="inline-end">
      <InputGroupButton variant="brand">Subscribe</InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
);

export const IconButton = () => (
  <InputGroup className="max-w-sm">
    <InputGroupInput readOnly defaultValue="https://www.thutides.com/reconnect-resort" />
    <InputGroupAddon align="inline-end">
      <InputGroupButton size="icon-xs" aria-label="Copy link">
        <CopyIcon />
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
);

export const Sizes = () => (
  <div className="flex flex-col gap-3 max-w-sm">
    <InputGroup>
      <InputGroupInput placeholder="Extra small (default)" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="xs" variant="outline">Apply</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
    <InputGroup>
      <InputGroupInput placeholder="Small" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="sm" variant="outline">Apply</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
    <InputGroup>
      <InputGroupInput placeholder="Icon small" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-sm" variant="outline" aria-label="Send">
          <SendIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </div>
);

export const InTextareaFooter = () => (
  <InputGroup className="max-w-md">
    <InputGroupTextarea placeholder="Ask about availability for a shoot in the Togean Islands." />
    <InputGroupAddon align="block-end">
      <InputGroupButton variant="ghost" size="sm">Attach brief</InputGroupButton>
      <InputGroupButton variant="brand" size="icon-sm" aria-label="Send message" className="ml-auto">
        <SendIcon />
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
);
