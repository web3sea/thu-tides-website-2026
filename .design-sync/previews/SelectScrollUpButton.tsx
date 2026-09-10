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

// SelectContent renders the scroll buttons itself; the up arrow shows once the list is scrolled down
// (Base UI scrolls the selected item into view on open, so selecting the last item reveals it).
export const ScrolledToSelected = () => (
  <Frame label="Destination (Coron selected near the bottom: up arrow at the top)">
    {/* trigger sits low: the aligned popup is clipped by the viewport top, so Base UI shows the up arrow */}
    <div style={{ paddingTop: 260 }}>
    <Select items={islands} defaultValue="coron" open modal={false}>
      <SelectTrigger className="w-64">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {islands.map((item) => (
          <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
    </div>
  </Frame>
);

export const TopOfList = () => (
  <Frame label="Destination (first item selected: no up arrow yet)">
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
