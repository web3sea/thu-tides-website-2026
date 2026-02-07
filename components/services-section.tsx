import { H2, H3, P } from '@/components/typography'

export function ServicesSection() {
  const services = [
    {
      title: 'Photography',
      icon: 'photo_camera',
      description: 'High-quality professional photography that captures the authentic beauty and unique character of your location. We showcase your property through stunning visual storytelling that attracts your ideal guests.',
    },
    {
      title: 'Video',
      icon: 'videocam',
      description: 'Compelling video content that brings your story to life. From aerial coastal views to intimate property tours, we create videos that elevate your brand perception and connect with travelers.',
    },
  ]

  return (
    <section className="relative section-padding bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <H2 className="text-gray-900 mb-4">
            What We Offer
          </H2>
          <P className="text-xl text-gray-600 font-light max-w-3xl">
            Professional content creation that captures the natural beauty and authentic experiences
            of your coastal hospitality brand. We help boutique properties stand out with visual
            storytelling that resonates with travelers.
          </P>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg max-w-4xl mx-auto">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white card-padding-lg rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto bg-blue-50 rounded-full">
                <span className="material-symbols-outlined text-4xl text-blue-600">
                  {service.icon}
                </span>
              </div>
              <H3 className="text-gray-900 mb-4 text-center">
                {service.title}
              </H3>
              <P className="text-gray-600 font-light text-center leading-relaxed">
                {service.description}
              </P>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
