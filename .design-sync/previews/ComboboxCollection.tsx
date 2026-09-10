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
const groupedDestinations = [
  { value: 'Indonesia', items: ['Buka Buka Island', 'Raja Ampat'] },
  { value: 'Philippines', items: ['Malapascua', 'Siargao'] },
];

// ComboboxCollection renders the filtered items of one ComboboxGroup; it has no element of its own.
export const InsideGroups = () => (
  <Frame label="Destination">
    <Combobox items={groupedDestinations} open modal={false}>
      <ComboboxInput placeholder="Where is the shoot?" className="w-80" />
      <ComboboxContent style={still}>
        <ComboboxEmpty>No destinations found.</ComboboxEmpty>
        <ComboboxList>
          {(group: { value: string; items: string[] }, index: number) => (
            <React.Fragment key={group.value}>
              {index > 0 && <ComboboxSeparator />}
              <ComboboxGroup items={group.items}>
                <ComboboxLabel>{group.value}</ComboboxLabel>
                <ComboboxCollection>
                  {(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
                </ComboboxCollection>
              </ComboboxGroup>
            </React.Fragment>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  </Frame>
);

export const FilteredGroups = () => (
  <Frame label="Destination (typed pa: filters within each group)">
    <Combobox items={groupedDestinations} defaultInputValue="pa" open modal={false}>
      <ComboboxInput placeholder="Where is the shoot?" className="w-80" />
      <ComboboxContent style={still}>
        <ComboboxEmpty>No destinations found.</ComboboxEmpty>
        <ComboboxList>
          {(group: { value: string; items: string[] }, index: number) => (
            <React.Fragment key={group.value}>
              {index > 0 && <ComboboxSeparator />}
              <ComboboxGroup items={group.items}>
                <ComboboxLabel>{group.value}</ComboboxLabel>
                <ComboboxCollection>
                  {(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
                </ComboboxCollection>
              </ComboboxGroup>
            </React.Fragment>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  </Frame>
);
