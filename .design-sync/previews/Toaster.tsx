import * as React from 'react';
import { Toaster, toast } from 'thu-tides-website';

const Stage = ({ children }: { children: React.ReactNode }) => (
  <div className="relative h-[400px] w-full overflow-hidden rounded-2xl border border-border bg-muted/40">
    <p className="p-4 text-sm text-muted-foreground">Toasts appear in the bottom-right corner after an action such as sending an enquiry.</p>
    {children}
  </div>
);

export const Success = () => {
  React.useEffect(() => {
    toast.success('Enquiry sent', { description: 'We will reply within two working days.', duration: Infinity });
  }, []);
  return (
    <Stage>
      <Toaster position="bottom-right" />
    </Stage>
  );
};

export const AllTypes = () => {
  React.useEffect(() => {
    toast('Media kit downloaded', { duration: Infinity });
    toast.info('Shoot scheduled for 14 May, Malapascua', { duration: Infinity });
    toast.warning('Drone permit for Bunaken still pending', { duration: Infinity });
    toast.error('Upload failed: reconnect_buka_buka.webp', { duration: Infinity });
  }, []);
  return (
    <Stage>
      <Toaster position="bottom-right" expand visibleToasts={4} />
    </Stage>
  );
};

export const RichColors = () => {
  React.useEffect(() => {
    toast.success('Gallery published', { description: 'Reconnect Resort, 42 images', duration: Infinity });
    toast.error('Two files exceeded 25 MB', { duration: Infinity });
  }, []);
  return (
    <Stage>
      <Toaster position="bottom-right" richColors expand closeButton />
    </Stage>
  );
};
