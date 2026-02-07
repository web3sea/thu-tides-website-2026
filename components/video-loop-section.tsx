import { Logo } from '@/components/logo'

export function VideoLoopSection() {
  return (
    <section className="hidden md:block relative w-full overflow-hidden pb-8 md:pb-12 bg-white">
      <div className="relative w-full h-[400px] md:h-[500px]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/vid_wave_loop.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Optional overlay gradient for logo visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20" />

        {/* Thu Tides Logo Centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Logo
            className="scale-150 md:scale-200"
            iconClassName="w-16 h-16 md:w-20 md:h-20"
            textClassName="text-4xl md:text-5xl font-light tracking-wide text-white"
          />
        </div>
      </div>
    </section>
  )
}
