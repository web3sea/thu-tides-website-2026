import { H2, H3, P, Typography } from '@/components/typography'
import { GlassCard } from '@/components/ui/glass-card'

export function CollabSection() {
  return (
    <section className="relative section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <H2 className="text-white mb-4">
            Let&apos;s Collaborate
          </H2>
          <P className="text-xl text-white font-light mb-4">
            Partner with us to create stunning visual content for your coastal hospitality brand
          </P>
          <P className="text-white font-light max-w-2xl mx-auto">
            Whether you&apos;re a boutique hotel, homestay, dive resort, or liveaboard, we offer
            flexible partnership options to create the professional content you need to attract
            your ideal guests.
          </P>
        </div>

        {/* Partnership Models */}
        <div className="space-y-8 mb-12">
          <Typography variant="section-title" className="text-white mb-8 text-center">
            Partnership Models
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            <GlassCard>
              <div className="flex items-center justify-center w-20 h-20 mb-6 mx-auto bg-white/10 rounded-full">
                <span className="material-symbols-outlined text-4xl text-white">
                  handshake
                </span>
              </div>
              <H3 className="text-white mb-4 text-center">Barter Collaboration</H3>
              <P className="text-white/80 font-light leading-relaxed text-center">
                Exchange accommodation and experiences for professional photography, video content,
                and Instagram promotion. Perfect for properties looking to build their visual
                content library.
              </P>
            </GlassCard>
            <GlassCard>
              <div className="flex items-center justify-center w-20 h-20 mb-6 mx-auto bg-white/10 rounded-full">
                <span className="material-symbols-outlined text-4xl text-white">
                  payments
                </span>
              </div>
              <H3 className="text-white mb-4 text-center">Paid Services</H3>
              <P className="text-white/80 font-light leading-relaxed text-center">
                Professional content creation services at rates that work for boutique properties.
                Get high-quality visual storytelling without traditional agency costs.
              </P>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  )
}
