import * as React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from 'thu-tides-website';
import { HugeiconsIcon } from '@hugeicons/react';
import { Delete02Icon, Calendar03Icon } from '@hugeicons/core-free-icons';

// bg-black/80 backdrop behind the dialog (rendered by AlertDialogContent)
export const DefaultOverlay = () => (
  <AlertDialog open>
    <AlertDialogTrigger render={<Button variant="brand" />}>Send enquiry</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Send this enquiry to Reconnect Resort?</AlertDialogTitle>
        <AlertDialogDescription>
          We will share your shoot dates (14 to 17 May) and the aerial plus underwater brief with the resort's marketing team.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Not yet</AlertDialogCancel>
        <AlertDialogAction variant="brand">Send enquiry</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

// Page content behind the overlay shows the dim + blur
export const OverlayOverContent = () => (
  <div className="relative">
    <div className="grid max-w-2xl gap-3 sm:grid-cols-2">
      <img src="https://www.thutides.com/reconnect_buka_buka.webp" alt="Aerial of Reconnect Resort" className="aspect-[4/3] w-full rounded-2xl object-cover" />
      <img src="https://www.thutides.com/DJI_aerial_hero.webp" alt="Aerial of a reef" className="aspect-[4/3] w-full rounded-2xl object-cover" />
    </div>
  <AlertDialog open>
    <AlertDialogTrigger render={<Button variant="destructive" />}>Remove gallery</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogMedia className="bg-destructive/10 text-destructive">
          <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
        </AlertDialogMedia>
        <AlertDialogTitle>Remove the Malapascua gallery?</AlertDialogTitle>
        <AlertDialogDescription>
          All 42 underwater images from the Evolution Divers shoot will be taken off the portfolio. This cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Keep gallery</AlertDialogCancel>
        <AlertDialogAction variant="destructive">Remove</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  </div>
);
