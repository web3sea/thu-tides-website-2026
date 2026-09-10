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

// DropdownMenuSub defaultOpen shows the nested Indonesia menu
export const Open = () => (
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
