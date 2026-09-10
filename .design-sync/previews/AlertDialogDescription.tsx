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

export const LongDescription = () => (
  <AlertDialog open>
    <AlertDialogTrigger render={<Button variant="outline" />}>Confirm dates</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogMedia>
          <HugeiconsIcon icon={Calendar03Icon} strokeWidth={2} />
        </AlertDialogMedia>
        <AlertDialogTitle>Lock in the Bunaken shoot dates?</AlertDialogTitle>
        <AlertDialogDescription>
          Siladen Resort has offered 2 to 6 June for the Bunaken shoot. Confirming reserves those dates, starts the Indonesian drone permit application, and sends the resort a shot list covering the jetty, the house reef wall and the sunset deck.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Check calendar</AlertDialogCancel>
        <AlertDialogAction variant="brand">Confirm dates</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export const WithLink = () => (
  <AlertDialog open>
    <AlertDialogTrigger render={<Button variant="destructive" />}>Remove gallery</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogMedia className="bg-destructive/10 text-destructive">
          <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
        </AlertDialogMedia>
        <AlertDialogTitle>Remove the Malapascua gallery?</AlertDialogTitle>
        <AlertDialogDescription>
          Images stay in your archive for 30 days. Read the <a href="#retention">retention policy</a> before removing.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Keep gallery</AlertDialogCancel>
        <AlertDialogAction variant="destructive">Remove</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
