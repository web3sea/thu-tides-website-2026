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

export const Sort = () => (
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
