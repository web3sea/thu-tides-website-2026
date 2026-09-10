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

export const Default = () => (
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

// inset aligns the label with inset items
export const Inset = () => (
  <Stage>
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger render={<Button variant="ghost" />}>Account</DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <DropdownMenuGroup>
          <DropdownMenuLabel inset>thu@thutides.com</DropdownMenuLabel>
          <DropdownMenuItem inset>Profile</DropdownMenuItem>
          <DropdownMenuItem inset>Media kit settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem inset>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </Stage>
);
