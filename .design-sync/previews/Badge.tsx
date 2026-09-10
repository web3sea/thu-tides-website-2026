import * as React from 'react';
import { Badge } from 'thu-tides-website';
import { HugeiconsIcon } from '@hugeicons/react';
import { Tick02Icon, Location01Icon, Camera01Icon } from '@hugeicons/core-free-icons';

export const Variants = () => (
  <div className="flex flex-wrap items-center gap-2">
    <Badge>Dive resort</Badge>
    <Badge variant="secondary">Boutique hotel</Badge>
    <Badge variant="outline">Aerial</Badge>
    <Badge variant="destructive">Season closed</Badge>
    <Badge variant="ghost">Underwater</Badge>
    <Badge variant="link">View gallery</Badge>
  </div>
);

export const WithIcons = () => (
  <div className="flex flex-wrap items-center gap-2">
    <Badge>
      <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} data-icon="inline-start" />
      Booked
    </Badge>
    <Badge variant="secondary">
      <HugeiconsIcon icon={Location01Icon} strokeWidth={2} data-icon="inline-start" />
      Malapascua, Philippines
    </Badge>
    <Badge variant="outline">
      Drone
      <HugeiconsIcon icon={Camera01Icon} strokeWidth={2} data-icon="inline-end" />
    </Badge>
  </div>
);

export const AsLink = () => (
  <div className="flex flex-wrap items-center gap-2">
    <Badge render={<a href="#case-study-reconnect" />}>Reconnect Resort</Badge>
    <Badge variant="outline" render={<a href="#case-study-evolution" />}>Evolution Divers</Badge>
  </div>
);

export const InContext = () => (
  <div className="flex max-w-sm flex-col gap-2">
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm font-medium">Buka Buka Island shoot</span>
      <Badge variant="secondary">3 days</Badge>
    </div>
    <p className="text-sm text-muted-foreground">Overwater villas, house reef and the dive centre at golden hour.</p>
    <div className="flex flex-wrap gap-1.5">
      <Badge variant="outline">Aerial</Badge>
      <Badge variant="outline">Underwater</Badge>
      <Badge variant="outline">Lifestyle</Badge>
    </div>
  </div>
);
