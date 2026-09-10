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

// Default size: cancel and action right-aligned in a row on sm+
export const RowFooter = () => (
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

// size="sm": footer becomes a two-column grid
export const TwoColumnFooter = () => (
  <AlertDialog open>
    <AlertDialogTrigger render={<Button variant="outline" />}>Confirm dates</AlertDialogTrigger>
    <AlertDialogContent size="sm">
      <AlertDialogHeader>
        <AlertDialogMedia>
          <HugeiconsIcon icon={Calendar03Icon} strokeWidth={2} />
        </AlertDialogMedia>
        <AlertDialogTitle>Lock in the Bunaken shoot dates?</AlertDialogTitle>
        <AlertDialogDescription>
          Siladen Resort has offered 2 to 6 June. Confirming reserves the dates and starts the drone permit application.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Check calendar</AlertDialogCancel>
        <AlertDialogAction variant="brand">Confirm dates</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export const DestructiveFooter = () => (
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
);
