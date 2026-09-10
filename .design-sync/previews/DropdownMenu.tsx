import * as React from 'react';
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from 'thu-tides-website';
import { HugeiconsIcon } from '@hugeicons/react';
import { Download04Icon, Share08Icon, Delete02Icon, Copy01Icon, Location01Icon, Camera01Icon } from '@hugeicons/core-free-icons';

// Menus reserve room below the trigger so the open popup stays inside the card.
const Stage = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex min-h-[380px] items-start gap-4 ${className}`}>{children}</div>
);

// Items with icons, shortcuts, separators, disabled + destructive rows
export const Basic = () => (
  <Stage>
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger render={<Button variant="outline" />}>Gallery actions</DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Reconnect Resort gallery</DropdownMenuLabel>
          <DropdownMenuItem>
            <HugeiconsIcon icon={Download04Icon} strokeWidth={2} />
            Download originals
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HugeiconsIcon icon={Share08Icon} strokeWidth={2} />
            Share with resort
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} />
            Copy gallery link
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>Request re-edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
          Remove gallery
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </Stage>
);

export const WithCheckboxes = () => (
  <Stage>
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger render={<Button variant="outline" />}>Filter portfolio</DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Show categories</DropdownMenuLabel>
          <DropdownMenuCheckboxItem checked>Aerial</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked>Underwater</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Lifestyle</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Architecture</DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked disabled>Published only</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </Stage>
);

export const WithRadioGroup = () => (
  <Stage>
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger render={<Button variant="outline" />}>Sort: Newest first</DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Sort galleries</DropdownMenuLabel>
          <DropdownMenuRadioGroup value="newest">
            <DropdownMenuRadioItem value="newest">Newest first</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="oldest">Oldest first</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="location">By location</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="client">By client</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </Stage>
);

// Submenu opened via defaultOpen on DropdownMenuSub
export const WithSubmenu = () => (
  <Stage>
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger render={<Button variant="outline" />}>Locations</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Browse by country</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSub defaultOpen>
          <DropdownMenuSubTrigger>
            <HugeiconsIcon icon={Location01Icon} strokeWidth={2} />
            Indonesia
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Buka Buka Island</DropdownMenuItem>
            <DropdownMenuItem>Bunaken, North Sulawesi</DropdownMenuItem>
            <DropdownMenuItem>Raja Ampat</DropdownMenuItem>
            <DropdownMenuItem>Komodo</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <HugeiconsIcon icon={Location01Icon} strokeWidth={2} />
            Philippines
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Malapascua</DropdownMenuItem>
            <DropdownMenuItem>Moalboal</DropdownMenuItem>
            <DropdownMenuItem>Siargao</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <HugeiconsIcon icon={Camera01Icon} strokeWidth={2} />
          All galleries
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </Stage>
);

// Closed menus: triggers only
export const Closed = () => (
  <div className="flex flex-wrap gap-3">
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>Gallery actions</DropdownMenuTrigger>
      <DropdownMenuContent><DropdownMenuItem>Download originals</DropdownMenuItem></DropdownMenuContent>
    </DropdownMenu>
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="brand" />}>Filter portfolio</DropdownMenuTrigger>
      <DropdownMenuContent><DropdownMenuCheckboxItem checked>Aerial</DropdownMenuCheckboxItem></DropdownMenuContent>
    </DropdownMenu>
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" />}>Account</DropdownMenuTrigger>
      <DropdownMenuContent><DropdownMenuItem>Sign out</DropdownMenuItem></DropdownMenuContent>
    </DropdownMenu>
  </div>
);
