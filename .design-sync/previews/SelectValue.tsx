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

export const SelectedLabel = () => (
  <Frame label="Service (label resolved from items)">
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

export const Placeholder = () => (
  <Frame label="Service (placeholder in muted foreground)">
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

export const CustomRender = () => (
  <Frame label="Service (render function adds a prefix)">
    <Select items={services} defaultValue="aerial">
      <SelectTrigger className="w-72">
        <SelectValue>
          {(value: string) => (
            <span>
              <span className="text-muted-foreground">Service: </span>
              {services.find((s) => s.value === value)?.label}
            </span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {services.map((item) => (
          <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </Frame>
);
