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

// Closed dialogs: the trigger renders as a Button via render prop
export const Closed = () => (
  <div className="flex flex-wrap gap-3">
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="brand" />}>Send enquiry</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Send this enquiry?</AlertDialogTitle>
          <AlertDialogDescription>Closed dialog: the trigger renders as a Button.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Not yet</AlertDialogCancel>
          <AlertDialogAction variant="brand">Send</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" />}>Remove gallery</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove the gallery?</AlertDialogTitle>
          <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Remove</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline" />}>Confirm dates</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm dates?</AlertDialogTitle>
          <AlertDialogDescription>2 to 6 June at Siladen Resort.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Check calendar</AlertDialogCancel>
          <AlertDialogAction variant="brand">Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
);

// Trigger sits behind the overlay once the dialog opens
export const Opened = () => (
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
