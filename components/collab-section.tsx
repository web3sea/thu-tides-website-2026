export function CollabSection() {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Let&apos;s Collaborate
          </h2>
          <p className="text-xl text-gray-600 font-light mb-4">
            Partner with us to create stunning visual content for your coastal hospitality brand
          </p>
          <p className="text-gray-600 font-light max-w-2xl mx-auto">
            Whether you&apos;re a boutique hotel, homestay, dive resort, or liveaboard, we offer
            flexible partnership options to create the professional content you need to attract
            your ideal guests.
          </p>
        </div>

        {/* Partnership Models */}
        <div className="bg-gray-50 p-8 rounded-lg">
          <h3 className="text-2xl font-light text-gray-900 mb-6 text-center">
            Partnership Models
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 mx-auto bg-blue-50 rounded-full">
                <span className="material-symbols-outlined text-3xl text-blue-600">
                  handshake
                </span>
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-3">Barter Collaboration</h4>
              <p className="text-gray-600 font-light">
                Exchange accommodation and experiences for professional photography, video content,
                and Instagram promotion. Perfect for properties looking to build their visual
                content library.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 mx-auto bg-blue-50 rounded-full">
                <span className="material-symbols-outlined text-3xl text-blue-600">
                  payments
                </span>
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-3">Paid Services</h4>
              <p className="text-gray-600 font-light">
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
