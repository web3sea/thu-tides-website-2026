export function ServicesSection() {
  const services = [
    {
      title: 'Photography',
      icon: 'photo_camera',
      description: 'High-quality professional photography that captures the authentic beauty and unique character of your location. We showcase your property through stunning visual storytelling that attracts your ideal guests.',
    },
    {
      title: 'Video Content',
      icon: 'videocam',
      description: 'Compelling video content that brings your story to life. From aerial coastal views to intimate property tours, we create videos that elevate your brand perception and connect with travelers.',
    },
    {
      title: 'Instagram Promotion',
      icon: 'share',
      description: 'Direct exposure to our engaged audience of travelers and adventure seekers. We promote your destination through our Instagram following, providing authentic reach to people actively planning their next coastal adventure.',
    },
  ]

  return (
    <section className="relative py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            What We Offer
          </h2>
          <p className="text-xl text-gray-600 font-light mb-6">
            Photography • Video • Instagram Promotion
          </p>
          <p className="text-lg text-gray-600 font-light max-w-3xl mx-auto">
            Professional content creation that captures the natural beauty and authentic experiences
            of your coastal hospitality brand. We help boutique properties stand out with visual
            storytelling that resonates with travelers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto bg-blue-50 rounded-full">
                <span className="material-symbols-outlined text-4xl text-blue-600">
                  {service.icon}
                </span>
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-4 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 font-light text-center leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
