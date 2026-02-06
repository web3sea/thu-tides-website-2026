'use client'

import { GigaLayout } from '@/components/giga-layout'
import { GigaHero } from '@/components/giga-hero'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/scroll-reveal'

export default function GigaDemoPage() {
  return (
    <GigaLayout>
      {/* Hero Section */}
      <GigaHero
        title="AI that talks like a human. Handles millions of calls."
        subtitle="AI agents for enterprise support"
        badge={{
          text: 'Giga Launches Browser Agent',
          href: '#',
        }}
        ctaText="Talk to us"
        ctaHref="#contact"
      />

      {/* Additional Content Section */}
      <section className="relative z-10 px-6 md:px-12 py-20 max-w-6xl mx-auto">
        <ScrollReveal trigger="slideUp">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
              Transform Your Customer Support
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Our AI agents provide human-like conversations at scale, helping enterprises deliver exceptional support experiences.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Agent Canvas',
              description: 'Build your ideal agent and solve support issues faster with our intuitive canvas interface.',
              icon: '🎨',
            },
            {
              title: 'Voice Experience',
              description: 'Emotionally aware agents that keep conversations natural and engaging.',
              icon: '🎙️',
            },
            {
              title: 'Browser Agent',
              description: 'Execute workflows directly inside browser-based systems without APIs.',
              icon: '🌐',
            },
          ].map((feature, index) => (
            <ScrollReveal key={index} trigger="slideUp" delay={index * 0.1}>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <CardHeader>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 md:px-12 py-20 max-w-4xl mx-auto text-center">
        <ScrollReveal trigger="slideUp">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl text-white">
                Ready to Transform Your Support?
              </CardTitle>
              <CardDescription className="text-lg text-white/70">
                Join thousands of companies using AI agents to scale their customer support.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="bg-white hover:bg-gray-100 text-slate-900 rounded-full font-semibold"
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-white/20 text-white hover:bg-white/10"
              >
                View Demo
              </Button>
            </CardContent>
          </Card>
        </ScrollReveal>
      </section>
    </GigaLayout>
  )
}
