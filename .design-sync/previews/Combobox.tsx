import * as React from 'react';
import {
  Button,
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
} from 'thu-tides-website';

const resorts = [
  'Reconnect Resort, Buka Buka Island',
  'Evolution Divers, Malapascua',
  'Papua Paradise, Raja Ampat',
  'Scuba Junkie, Komodo',
  'Nay Palad, Siargao',
  'El Nido Resorts, Palawan',
];

const groupedDestinations = [
  { value: 'Indonesia', items: ['Buka Buka Island', 'Raja Ampat'] },
  { value: 'Philippines', items: ['Malapascua', 'Siargao'] },
];

const deliverables = ['Aerial stills', 'Underwater stills', 'Reels', 'Room tour video', 'Drone footage', 'Behind the scenes'];

// Captures are static: skip the 100ms open animation so the popup is never caught at opacity 0.
const still = { animation: 'none' } as const;

const Frame = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex min-h-[380px] flex-col gap-2 p-6">
    <span className="text-muted-foreground text-xs">{label}</span>
    {children}
  </div>
);

export const Closed = () => (
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

export const Open = () => (
  <Frame label="Property">
    <Combobox items={resorts} defaultValue={resorts[1]} open modal={false}>
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

export const Grouped = () => (
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

export const Empty = () => (
  <Frame label="Property (no match)">
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

export const Chips = () => {
  const anchor = React.useRef<HTMLDivElement | null>(null);
  return (
    <Frame label="Deliverables (multi-select)">
      <Combobox items={deliverables} multiple defaultValue={['Aerial stills', 'Reels']} open modal={false}>
        <ComboboxChips ref={anchor} className="w-96">
          <ComboboxValue>
            {(value: string[]) => (
              <React.Fragment>
                {value.map((v) => <ComboboxChip key={v}>{v}</ComboboxChip>)}
                <ComboboxChipsInput placeholder={value.length ? '' : 'Add deliverables'} />
              </React.Fragment>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor} style={still}>
          <ComboboxEmpty>No deliverables found.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Frame>
  );
};

export const ButtonTrigger = () => (
  <Frame label="Property (button trigger with search inside popup)">
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

export const Disabled = () => (
  <Frame label="Property (disabled)">
    <Combobox items={resorts} defaultValue={resorts[0]} disabled>
      <ComboboxInput disabled className="w-80" />
      <ComboboxContent style={still}>
        <ComboboxList>
          {(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  </Frame>
);
