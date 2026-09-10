import * as React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from 'thu-tides-website';

const services = [
  { label: 'Aerial photography', value: 'aerial' },
  { label: 'Underwater photography', value: 'underwater' },
  { label: 'Video production', value: 'video' },
  { label: 'Full content package', value: 'package' },
];
const Frame = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex min-h-[380px] flex-col gap-2 p-6">
    <span className="text-muted-foreground text-xs">{label}</span>
    {children}
  </div>
);

export const Default = () => (
  <Frame label="Service">
    <Select items={services} defaultValue="underwater">
      <SelectTrigger className="w-64">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {services.map((item) => (
          <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </Frame>
);

export const Small = () => (
  <Frame label="Service (size sm)">
    <Select items={services} defaultValue="aerial">
      <SelectTrigger size="sm" className="w-56">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {services.map((item) => (
          <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </Frame>
);

export const Placeholder = () => (
  <Frame label="Service (nothing selected)">
    <Select items={services} defaultValue="">
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Choose a service" />
      </SelectTrigger>
      <SelectContent>
        {services.map((item) => (
          <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </Frame>
);

export const Invalid = () => (
  <Frame label="Service (aria-invalid)">
    <Select items={services} defaultValue="">
      <SelectTrigger className="w-64" aria-invalid>
        <SelectValue placeholder="Service is required" />
      </SelectTrigger>
      <SelectContent>
        {services.map((item) => (
          <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </Frame>
);

export const Disabled = () => (
  <Frame label="Service (disabled)">
    <Select items={services} defaultValue="video" disabled>
      <SelectTrigger className="w-64">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {services.map((item) => (
          <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </Frame>
);

export const FullWidth = () => (
  <Frame label="Service (w-full inside a form column)">
    <div className="w-96">
      <Select items={services} defaultValue="package">
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {services.map((item) => (
          <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
        ))}
        </SelectContent>
      </Select>
    </div>
  </Frame>
);
