import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from 'thu-tides-website';

const services = [
  { label: 'Aerial photography', value: 'aerial' },
  { label: 'Underwater photography', value: 'underwater' },
  { label: 'Video production', value: 'video' },
  { label: 'Full content package', value: 'package' },
];

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

export const Closed = () => (
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

export const Placeholder = () => (
  <Frame label="Service">
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

export const Open = () => (
  <Frame label="Service">
    <Select items={services} defaultValue="underwater" open modal={false}>
      <SelectTrigger className="w-64">
        <SelectValue />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false}>
        {services.map((item) => (
          <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </Frame>
);

export const Grouped = () => (
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

export const Small = () => (
  <Frame label="Delivery format (size sm)">
    <Select items={{ web: 'Web-optimised', print: 'Print resolution', raw: 'RAW files' }} defaultValue="web">
      <SelectTrigger size="sm" className="w-56">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="web">Web-optimised</SelectItem>
        <SelectItem value="print">Print resolution</SelectItem>
        <SelectItem value="raw">RAW files</SelectItem>
      </SelectContent>
    </Select>
  </Frame>
);

export const Disabled = () => (
  <Frame label="Service (disabled)">
    <Select items={services} defaultValue="aerial" disabled>
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
