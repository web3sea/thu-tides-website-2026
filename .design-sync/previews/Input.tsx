import * as React from 'react';
import { Input, Label } from 'thu-tides-website';

export const Default = () => (
  <Input className="max-w-sm" placeholder="Property name" />
);

export const WithLabel = () => (
  <div className="flex flex-col gap-2 max-w-sm">
    <Label htmlFor="in-email">Work email</Label>
    <Input id="in-email" type="email" placeholder="gm@reconnectresort.com" />
  </div>
);

export const Types = () => (
  <div className="flex flex-col gap-3 max-w-sm">
    <Input type="text" defaultValue="Evolution Divers" />
    <Input type="email" defaultValue="bookings@evolutiondivers.com" />
    <Input type="tel" defaultValue="+63 917 000 0000" />
    <Input type="number" defaultValue="18" />
    <Input type="date" defaultValue="2026-04-20" />
  </div>
);

export const Invalid = () => (
  <Input className="max-w-sm" aria-invalid="true" defaultValue="reservations@evolution" />
);

export const Disabled = () => (
  <Input className="max-w-sm" disabled defaultValue="Buka Buka Island, Indonesia" />
);

export const File = () => (
  <div className="flex flex-col gap-2 max-w-sm">
    <Label htmlFor="in-file">Current brand guidelines</Label>
    <Input id="in-file" type="file" />
  </div>
);
