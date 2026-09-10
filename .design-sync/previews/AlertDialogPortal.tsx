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
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from 'thu-tides-website';
import { HugeiconsIcon } from '@hugeicons/react';
import { Delete02Icon, Calendar03Icon } from '@hugeicons/core-free-icons';

// AlertDialogContent portals its overlay and popup to the document body
export const Default = () => (
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

// Explicit AlertDialogPortal wrapping the content. AlertDialogContent already renders
// AlertDialogOverlay, so do not add a second overlay here (they would stack to solid black).
export const ExplicitPortal = () => (
  <AlertDialog open>
    <AlertDialogTrigger render={<Button variant="outline" />}>Confirm dates</AlertDialogTrigger>
    <AlertDialogPortal>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Lock in the Bunaken shoot dates?</AlertDialogTitle>
          <AlertDialogDescription>Siladen Resort has offered 2 to 6 June.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Check calendar</AlertDialogCancel>
          <AlertDialogAction variant="brand">Confirm dates</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialog>
);
