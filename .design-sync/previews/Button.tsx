import * as React from 'react';
import { Button } from 'thu-tides-website';

export const Variants = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button>Book a shoot</Button>
    <Button variant="brand">View portfolio</Button>
    <Button variant="secondary">Learn more</Button>
    <Button variant="outline">Download media kit</Button>
    <Button variant="ghost">Skip</Button>
    <Button variant="link">Read the case study</Button>
    <Button variant="destructive">Remove photo</Button>
  </div>
);

export const Sizes = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button variant="brand" size="xs">Extra small</Button>
    <Button variant="brand" size="sm">Small</Button>
    <Button variant="brand">Default</Button>
    <Button variant="brand" size="lg">Large</Button>
  </div>
);

export const Disabled = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button disabled>Default</Button>
    <Button variant="brand" disabled>Brand</Button>
    <Button variant="outline" disabled>Outline</Button>
  </div>
);

export const AsLink = () => (
  <Button variant="brand" size="lg" render={<a href="#contact" />}>
    Start a partnership
  </Button>
);
