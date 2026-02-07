import { H2, H3, P, Typography } from '@/components/typography'
import { GlassCard } from '@/components/ui/glass-card'

export function CollabSection() {
  return (
    <section id="contact" className="relative section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <H2 className="text-white mb-4">
            Partnership
          </H2>
          <P className="text-xl text-white font-light">
            Partner with us to create stunning visual content for your coastal hospitality brand
          </P>
        </div>

        <div className="space-y-8 mb-12">
          <div className="max-w-md mx-auto">
            <GlassCard>
              <div className="flex items-center justify-center w-20 h-20 mb-8 mx-auto bg-white/10 rounded-full">
                <span className="material-symbols-outlined text-4xl text-white">
                  handshake
                </span>
              </div>

              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-white/90 mb-2">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                    placeholder="+62 123 456 7890"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="inquiry" className="block text-sm font-medium text-white/90 mb-2">
                    Inquiry
                  </label>
                  <textarea
                    id="inquiry"
                    name="inquiry"
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent resize-none min-h-32 md:min-h-48 lg:min-h-64"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-white hover:bg-gray-100 text-slate-900 rounded-full font-semibold transition-all hover:scale-105 shadow-lg"
                >
                  Send Inquiry
                </button>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  )
}
