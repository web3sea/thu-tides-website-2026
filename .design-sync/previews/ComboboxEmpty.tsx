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

export const NoMatch = () => (
  <Frame label="Property (typed Maldives)">
    <Combobox items={resorts} defaultInputValue="Maldives" open modal={false}>
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

export const CustomMessage = () => (
  <Frame label="Property (custom empty copy)">
    <Combobox items={resorts} defaultInputValue="Zanzibar" open modal={false}>
      <ComboboxInput placeholder="Search a partner property" className="w-80" />
      <ComboboxContent style={still}>
        <ComboboxEmpty>Not a partner yet. Suggest a property below.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  </Frame>
);

export const HiddenWhenResults = () => (
  <Frame label="Property (results present: empty state hidden)">
    <Combobox items={resorts} defaultValue={resorts[1]} open modal={false}>
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
