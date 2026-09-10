import * as React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from 'thu-tides-website';

const destinations = [
  { label: 'Buka Buka Island', value: 'buka-buka' },
  { label: 'Raja Ampat', value: 'raja-ampat' },
  { label: 'Komodo', value: 'komodo' },
  { label: 'Malapascua', value: 'malapascua' },
  { label: 'Siargao', value: 'siargao' },
  { label: 'Palawan', value: 'palawan' },
];
const Frame = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex min-h-[380px] flex-col gap-2 p-6">
    <span className="text-muted-foreground text-xs">{label}</span>
    {children}
  </div>
);

export const CountryLabels = () => (
  <Frame label="Destination">
    <Select items={destinations} defaultValue="malapascua" open modal={false}>
      <SelectTrigger className="w-64">
        <SelectValue />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false}>
        <SelectGroup>
          <SelectLabel>Indonesia</SelectLabel>
          <SelectItem value="buka-buka">Buka Buka Island</SelectItem>
          <SelectItem value="raja-ampat">Raja Ampat</SelectItem>
          <SelectItem value="komodo">Komodo</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Philippines</SelectLabel>
          <SelectItem value="malapascua">Malapascua</SelectItem>
          <SelectItem value="siargao">Siargao</SelectItem>
          <SelectItem value="palawan" disabled>Palawan (fully booked)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </Frame>
);

export const CustomLabel = () => (
  <Frame label="Destination (label with extra tracking)">
    <Select items={destinations} defaultValue="siargao" open modal={false}>
      <SelectTrigger className="w-64">
        <SelectValue />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false}>
        <SelectGroup>
          <SelectLabel className="uppercase tracking-wide">Philippines</SelectLabel>
          <SelectItem value="malapascua">Malapascua</SelectItem>
          <SelectItem value="siargao">Siargao</SelectItem>
          <SelectItem value="palawan">Palawan</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </Frame>
);
