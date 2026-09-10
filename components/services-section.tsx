import Link from 'next/link'
import { H3, P } from '@/components/typography'

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
    {
      title: 'Web & Automation',
      icon: 'settings_suggest',
      description: 'Modern websites and smart automation that work together seamlessly. We build fast, mobile-responsive sites that convert visitors into bookings, plus automation solutions that streamline operations and enhance guest experiences.',
    },
    {
      title: 'Travel Guides',
      icon: 'map',
      description: 'Mobile travel guides built from our own trips across Indonesia: seasons, permits, real budgets and the islands we would go back to. Raja Ampat is out now, with Lombok and Bali to follow.',
      href: '/guides',
      cta: 'Browse the guides',
    },
  ]

  return (
    <section className="relative section-padding bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <P className="text-2xl md:text-3xl text-gray-900 font-light max-w-3xl leading-relaxed mx-auto">
            Professional content creation that captures the natural beauty and authentic experiences
            of your coastal hospitality brand. We help boutique properties stand out with visual
            storytelling that resonates with travelers.
          </P>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg mx-auto">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white card-padding-lg rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col"
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
              {service.href && (
                <Link
                  href={service.href}
                  className="mt-6 self-center inline-flex items-center gap-1 text-sm font-semibold text-brand-cerulean hover:text-brand-cerulean-2 transition-colors"
                >
                  {service.cta}
                  <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
