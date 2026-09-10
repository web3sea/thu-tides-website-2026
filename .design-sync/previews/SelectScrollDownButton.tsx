import * as React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from 'thu-tides-website';

const islands = [
  'Buka Buka Island', 'Raja Ampat', 'Komodo', 'Bali', 'Lombok', 'Wakatobi', 'Malapascua', 'Siargao', 'Palawan', 'Cebu', 'Bohol', 'Coron',
].map((name) => ({ label: name, value: name.toLowerCase().replace(/ /g, '-') }));
const Frame = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex min-h-[380px] flex-col gap-2 p-6">
    <span className="text-muted-foreground text-xs">{label}</span>
    {children}
  </div>
);

// SelectContent renders the scroll buttons itself; Base UI shows them in alignItemWithTrigger mode (the default)
// once the list overflows its max height.
export const OverflowingList = () => (
  <Frame label="Destination (12 items, max height 224px: down arrow at the bottom)">
    <Select items={islands} defaultValue="buka-buka-island" open modal={false}>
      <SelectTrigger className="w-64">
        <SelectValue />
      </SelectTrigger>
      <SelectContent style={{ maxHeight: 224 }}>
        {islands.map((item) => (
          <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </Frame>
);

export const Closed = () => (
  <Frame label="Destination">
    <Select items={islands} defaultValue="raja-ampat">
      <SelectTrigger className="w-64">
        <SelectValue />
      </SelectTrigger>
      <SelectContent style={{ maxHeight: 224 }}>
        {islands.map((item) => (
          <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </Frame>
);
