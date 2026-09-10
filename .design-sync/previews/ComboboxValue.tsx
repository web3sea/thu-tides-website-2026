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
const deliverables = ['Aerial stills', 'Underwater stills', 'Reels', 'Room tour video', 'Drone footage', 'Behind the scenes'];

export const SelectedLabel = () => (
  <Frame label="Property (button trigger shows the selected value)">
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

export const Placeholder = () => (
  <Frame label="Property (nothing selected)">
    <Combobox items={resorts} defaultValue={null}>
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

export const RenderChips = () => {
  const anchor = React.useRef<HTMLDivElement | null>(null);
  return (
    <Frame label="Deliverables (multi-select)">
      <Combobox items={deliverables} multiple defaultValue={['Aerial stills', 'Reels']}>
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
