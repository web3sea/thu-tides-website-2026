import * as React from 'react';
import { Button, Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxCollection, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxLabel, ComboboxList, ComboboxSeparator, ComboboxTrigger, ComboboxValue } from 'thu-tides-website';

const resorts = [
  'Reconnect Resort, Buka Buka Island',
  'Evolution Divers, Malapascua',
  'Papua Paradise, Raja Ampat',
  'Scuba Junkie, Komodo',
  'Nay Palad, Siargao',
  'El Nido Resorts, Palawan',
];
// Captures are static: skip the 100ms open animation so the popup is never caught at opacity 0.
const still = { animation: 'none' } as const;
const Frame = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex min-h-[380px] flex-col gap-2 p-6">
    <span className="text-muted-foreground text-xs">{label}</span>
    {children}
  </div>
);

export const AsOutlineButton = () => (
  <Frame label="Property (open)">
    <Combobox items={resorts} defaultValue={resorts[0]} open modal={false}>
      <ComboboxTrigger render={<Button variant="outline" className="w-80 justify-between" />}>
        <ComboboxValue placeholder="Pick a property" />
      </ComboboxTrigger>
      <ComboboxContent style={still}>
        <ComboboxInput placeholder="Search" showTrigger={false} />
        <ComboboxEmpty>No properties found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  </Frame>
);

export const ClosedButton = () => (
  <Frame label="Property">
    <Combobox items={resorts} defaultValue={resorts[0]}>
      <ComboboxTrigger render={<Button variant="outline" className="w-80 justify-between" />}>
        <ComboboxValue placeholder="Pick a property" />
      </ComboboxTrigger>
      <ComboboxContent style={still}>
        <ComboboxInput placeholder="Search" showTrigger={false} />
        <ComboboxEmpty>No properties found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  </Frame>
);

export const InsideInput = () => (
  <Frame label="Property (default trigger inside ComboboxInput)">
    <Combobox items={resorts}>
      <ComboboxInput placeholder="Search a partner property" className="w-80" />
      <ComboboxContent style={still}>
        <ComboboxEmpty>No properties found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  </Frame>
);
