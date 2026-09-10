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

export const Placeholder = () => (
  <Frame label="Property">
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

export const WithValue = () => (
  <Frame label="Property (selected value, clear button)">
    <Combobox items={resorts} defaultValue={resorts[0]}>
      <ComboboxInput placeholder="Search a partner property" className="w-80" showClear />
      <ComboboxContent style={still}>
        <ComboboxEmpty>No properties found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  </Frame>
);

export const OpenList = () => (
  <Frame label="Property (open)">
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

export const NoTrigger = () => (
  <Frame label="Property (showTrigger={false}: plain search field)">
    <Combobox items={resorts}>
      <ComboboxInput placeholder="Search a partner property" className="w-80" showTrigger={false} />
      <ComboboxContent style={still}>
        <ComboboxEmpty>No properties found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  </Frame>
);

export const Disabled = () => (
  <Frame label="Property (disabled)">
    <Combobox items={resorts} defaultValue={resorts[2]} disabled>
      <ComboboxInput placeholder="Search a partner property" className="w-80" disabled />
      <ComboboxContent style={still}>
        <ComboboxEmpty>No properties found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  </Frame>
);
