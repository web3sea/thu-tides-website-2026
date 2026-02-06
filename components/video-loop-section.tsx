export function VideoLoopSection() {
  return (
    <section className="relative w-full overflow-hidden">
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

        {/* Optional overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40" />

        {/* Optional text overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <p className="text-2xl md:text-3xl font-light">
              Capturing the beauty of coastal hospitality
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
