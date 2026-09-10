import * as React from 'react';
import { LocationVoteDropdown } from 'thu-tides-website';

// The component fetches /api/votes/results whenever it opens. The preview
// sandbox has no API, so the reachable static state is the error fallback
// ("Failed to load results / Try again") inside its GlassCard. It is designed
// for the dark hero, so it sits on a navy gradient here.
// framer-motion mounts the dropdown at opacity 0 and springs to 1; the static capture lands before
// that, so the frame pins the animated wrappers to their final state.
const Still = () => (
  <style>{`.vote-frame [style*="opacity"] { opacity: 1 !important; transform: none !important; }`}</style>
);

const Hero = ({ children }: { children: React.ReactNode }) => (
  <div className="vote-frame min-h-[360px] w-full p-8" style={{ background: 'linear-gradient(180deg, #020617 0%, #0f172a 55%, #083344 100%)' }}>
    <Still />
    <p className="text-center text-sm font-medium text-white/70">Where should Thu Tides shoot next?</p>
    {children}
  </div>
);

export const OpenDesktop = () => {
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  return (
    <Hero>
      <button ref={triggerRef} type="button" className="mx-auto mt-3 block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs text-white">
        Vote for the next destination
      </button>
      <LocationVoteDropdown isOpen onClose={() => {}} triggerRef={triggerRef} />
    </Hero>
  );
};

export const ClosedState = () => {
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  return (
    <Hero>
      <button ref={triggerRef} type="button" className="mx-auto mt-3 block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs text-white">
        Vote for the next destination
      </button>
      <LocationVoteDropdown isOpen={false} onClose={() => {}} triggerRef={triggerRef} />
      <p className="mt-6 text-center text-xs text-white/50">Closed: the component renders nothing until isOpen is true.</p>
    </Hero>
  );
};
