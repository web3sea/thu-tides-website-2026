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

        <div className="space-y-8">
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

          {/* Contact Form Placeholder */}
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <h3 className="text-2xl font-light text-gray-900 mb-6">
              Get in Touch
            </h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="propertyName" className="block text-sm font-medium text-gray-700 mb-2">
                  Property Name
                </label>
                <input
                  type="text"
                  id="propertyName"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your hotel, resort, or property"
                />
              </div>
              <div>
                <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                <select
                  id="propertyType"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select type</option>
                  <option value="boutique-hotel">Boutique Hotel</option>
                  <option value="homestay">Homestay</option>
                  <option value="dive-resort">Dive Resort</option>
                  <option value="liveaboard">Liveaboard</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="partnershipType" className="block text-sm font-medium text-gray-700 mb-2">
                  Partnership Interest
                </label>
                <select
                  id="partnershipType"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select preference</option>
                  <option value="barter">Barter</option>
                  <option value="paid">Paid</option>
                  <option value="either">Either</option>
                  <option value="not-sure">Not Sure</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about your property and collaboration ideas"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
