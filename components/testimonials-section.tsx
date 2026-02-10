import Image from 'next/image'
import { H2, P } from '@/components/typography'

interface Testimonial {
  id: string
  property: string
  location: string
  logo: string
  website?: string
}

const testimonials: Testimonial[] = [
  {
    id: 'reconnect-resort',
    property: "Reconnect Resort",
    location: "Buka Buka Island, Indonesia",
    logo: "/logo_reconnect.png",
    website: "https://www.reconnect.id/",
  },
  {
    id: 'evolution-divers',
    property: "Evolution Divers",
    location: "Malapascua, Philippines",
    logo: "/logo_evolution.png",
    website: "https://evolution.com.ph/",
  },
  {
    id: 'munduk-heaven',
    property: "Munduk Heaven",
    location: "Bali, Indonesia",
    logo: "/logo_munduk_heaven.png",
    website: "https://mundukheavenluxuryvillas.com/",
  },
]

export function TestimonialsSection(): React.JSX.Element {
  return (
    <section id="partners" className="section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        <H2 className="text-center mb-16 max-w-4xl mx-auto">
          Trusted by coastal hotels, dive resorts, and liveaboards across Indonesia and the Philippines
        </H2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((testimonial) => (
            <a
              key={testimonial.id}
              href={testimonial.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-6 flex items-center justify-center">
                <Image
                  src={testimonial.logo}
                  alt={`${testimonial.property} logo`}
                  width={200}
                  height={120}
                  className="object-contain"
                />
              </div>

              <p className="text-lg font-medium text-gray-900 mb-1">
                {testimonial.property}
              </p>

              <P className="text-sm text-gray-600 text-center">
                {testimonial.location}
              </P>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
