'use client'

import { AnimatedWaveLogo } from '@/components/animated-wave-logo'
import { LazyVideo } from '@/components/lazy-video'

export function VideoLoopSection() {
  return (
    <section className="hidden md:block relative w-full overflow-hidden pb-8 md:pb-12 bg-white">
      <div className="relative w-full h-[400px] md:h-[500px]">
        {/* Lazy-loaded background video */}
        <LazyVideo
          src="/website_banner_optimized.mp4"
          srcWebm="/website_banner_optimized.webm"
          poster="/website_banner_poster.webp"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          threshold={0.1}
          rootMargin="200px 0px"
        />

        {/* Optional overlay gradient for logo visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20" />

        {/* Thu Tides Logo Centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatedWaveLogo
            className="scale-150 md:scale-200"
            iconClassName="w-16 h-16 md:w-20 md:h-20"
            textClassName="text-4xl md:text-5xl font-light tracking-wide text-white"
          />
        </div>
      </div>
    </section>
  )
}
