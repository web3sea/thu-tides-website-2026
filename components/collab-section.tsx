export function CollabSection() {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            Let&apos;s Collaborate
          </h2>
          <p className="text-xl text-white font-light mb-4">
            Partner with us to create stunning visual content for your coastal hospitality brand
          </p>
          <p className="text-white font-light max-w-2xl mx-auto">
            Whether you&apos;re a boutique hotel, homestay, dive resort, or liveaboard, we offer
            flexible partnership options to create the professional content you need to attract
            your ideal guests.
          </p>
        </div>

        {/* Partnership Models */}
        <div className="space-y-8 mb-12">
          <h3 className="text-3xl md:text-4xl font-light text-white mb-8 text-center">
            Partnership Models
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center justify-center w-20 h-20 mb-6 mx-auto bg-white/10 rounded-full">
                <span className="material-symbols-outlined text-4xl text-white">
                  handshake
                </span>
              </div>
              <h4 className="text-2xl font-light text-white mb-4 text-center">Barter Collaboration</h4>
              <p className="text-white/80 font-light leading-relaxed text-center">
                Exchange accommodation and experiences for professional photography, video content,
                and Instagram promotion. Perfect for properties looking to build their visual
                content library.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center justify-center w-20 h-20 mb-6 mx-auto bg-white/10 rounded-full">
                <span className="material-symbols-outlined text-4xl text-white">
                  payments
                </span>
              </div>
              <h4 className="text-2xl font-light text-white mb-4 text-center">Paid Services</h4>
              <p className="text-white/80 font-light leading-relaxed text-center">
                Professional content creation services at rates that work for boutique properties.
                Get high-quality visual storytelling without traditional agency costs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
