import { H2, H3, P } from '@/components/typography'
import Image from 'next/image'

export function AboutSection() {
  return (
    <section id="about" className="relative section-padding bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <H2 className="text-gray-900 mb-4 text-center">
            Authentic visual storytelling for coastal and diving hospitality brands
          </H2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-space-xl items-start">
          {/* Photo */}
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
            <Image
              src="/uw_napalin.webp"
              alt="Underwater photography"
              fill
              className="object-contain"
            />
          </div>

          {/* Approach */}
          <div className="space-y-4">
            <H3 className="text-gray-900 mb-4">
              Our Approach
            </H3>
            <P className="text-gray-600 font-light leading-relaxed">
              We create visual content that captures the natural beauty and authentic experiences
              of your brand. Our work emphasizes artistic expression that resonates with travelers—
              showcasing the unique character of each location with professional quality that
              elevates brand perception.
            </P>
            <P className="text-gray-600 font-light leading-relaxed">
              Beyond content creation, we leverage our Instagram following to promote travel
              destinations, giving partner brands direct exposure to an engaged audience actively
              seeking authentic coastal experiences.
            </P>
            <P className="text-gray-600 font-light leading-relaxed">
              Coastal and diving destinations offer some of the most visually stunning travel
              opportunities. We specialize in this niche because we understand the unique visual
              language of ocean-centered hospitality—from underwater photography to aerial coastal
              views, from sunrise beach moments to the intimate character of boutique properties
              by the sea. We help you avoid generic stock photos and create content that captures
              the authentic, unique character of your location and brand.
            </P>
          </div>
        </div>
      </div>
    </section>
  )
}
