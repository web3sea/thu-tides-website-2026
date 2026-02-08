"use client"

import { H2, H3, P, Typography } from '@/components/typography'
import { GlassCard } from '@/components/ui/glass-card'
import { toast } from 'sonner'
import { FormEvent, useState } from 'react'

export function CollabSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Prevent double submissions
    if (isSubmitting) return
    setIsSubmitting(true)

    // Store form reference before async operations
    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      name: formData.get('name') as string,
      whatsapp: formData.get('whatsapp') as string,
      email: formData.get('email') as string,
      inquiry: formData.get('inquiry') as string,
    }

    try {
      // Send to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error('API error:', result)
        throw new Error(result.error || 'Failed to send inquiry')
      }

      // Show success toast in bottom right
      toast.success("Thank you for sharing that information. We will be in touch.", {
        position: "bottom-right",
      })

      // Reset form using stored reference
      form.reset()
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error("Something went wrong. Please try again.", {
        position: "bottom-right",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <section id="contact" className="relative section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <H2 className="text-white mb-4">
            Partner with us to create stunning visual content for your coastal hospitality brand
          </H2>
        </div>

        <div className="space-y-8 mb-12">
          <div className="w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-4">
            <GlassCard>
              <div className="flex items-center justify-center w-20 h-20 mb-8 mx-auto bg-white/10 rounded-full">
                <span className="material-symbols-outlined text-4xl text-white">
                  handshake
                </span>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
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
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                      placeholder="+62 123 456 7890"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
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
                    rows={8}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent resize-none min-h-48 md:min-h-64 lg:min-h-80 transition-all"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-white hover:bg-gray-100 text-slate-900 rounded-full font-semibold transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  )
}
