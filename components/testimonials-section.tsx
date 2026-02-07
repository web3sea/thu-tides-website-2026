import { H2, H3, P, Quote } from '@/components/typography'
import { GlassCard } from '@/components/ui/glass-card'

interface Testimonial {
  quote: string
  author: string
  role: string
  property: string
  location: string
  image?: string
}

// TODO: Replace with your actual testimonials
const testimonials: Testimonial[] = [
  {
    quote: "Thu Tides captured the essence of our resort perfectly. The underwater shots showcased our dive sites in a way that immediately increased bookings. Their professionalism and eye for detail are unmatched.",
    author: "Sarah Chen",
    role: "Marketing Director",
    property: "Reconnect Resort",
    location: "Buka Buka Island, Indonesia",
  },
  {
    quote: "Working with Thu Tides was seamless. They understood our brand and delivered stunning aerial content that elevated our entire online presence. The barter partnership was perfect for our boutique property.",
    author: "Michael Torres",
    role: "Owner",
    property: "Evolution Divers",
    location: "Malapascua, Philippines",
  },
  {
    quote: "The quality of Thu Tides' photography is exceptional. Their travel and underwater expertise helped us showcase our unique location to travelers seeking authentic coastal experiences.",
    author: "Diana Kusuma",
    role: "General Manager",
    property: "Munduk Heaven",
    location: "Bali, Indonesia",
  },
]

export function TestimonialsSection() {
  return (
    <section id="partners" className="relative section-padding bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <H2 className="text-gray-900 mb-4 text-center">
            Trusted by coastal hotels, dive resorts, and liveaboards across Indonesia and the Philippines
          </H2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white card-padding-lg rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Quote Icon */}
              <div className="flex items-center justify-center w-12 h-12 mb-6 bg-blue-50 rounded-full">
                <span className="material-symbols-outlined text-2xl text-blue-600">
                  format_quote
                </span>
              </div>

              {/* Quote */}
              <P className="text-gray-700 font-light leading-relaxed mb-6 flex-grow italic">
                &ldquo;{testimonial.quote}&rdquo;
              </P>

              {/* Author Info */}
              <div className="border-t border-gray-200 pt-6">
                <H3 className="text-gray-900 mb-1 text-lg">
                  {testimonial.author}
                </H3>
                <P className="text-sm text-gray-600 font-light">
                  {testimonial.role}
                </P>
                <P className="text-sm text-blue-600 font-medium mt-2">
                  {testimonial.property}
                </P>
                <P className="text-xs text-gray-500 font-light">
                  {testimonial.location}
                </P>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
