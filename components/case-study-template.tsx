'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HeroWithImage } from '@/components/hero-with-image'
import { CaseStudySection, CaseStudyFlow } from '@/components/case-study-section'
import { ImageCarousel, type CarouselImage } from '@/components/image-carousel'
import { ImageGallery, type GalleryImage } from '@/components/image-gallery'
import { Typography, H2, P, Quote } from '@/components/typography'
import { ScrollReveal, ScrollRevealStagger } from '@/components/scroll-reveal'
import { cn } from '@/lib/utils'

/**
 * Sample case study data structure
 * Replace with real data from your CMS or API
 */
const sampleCaseStudy = {
  title: 'Urban Transformation Project',
  subtitle: 'Capturing the essence of city renewal through architectural photography',
  heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop',
  year: 2024,
  category: 'Architecture',
  client: 'Downtown Development Corp',
  tools: ['Sony A7R IV', 'Zeiss Lenses', 'Lightroom', 'Photoshop'],

  challenge: {
    title: 'The Challenge',
    description:
      'The client needed to document an ambitious urban renewal project spanning six city blocks. The challenge was to capture the transformation in a way that told a compelling visual narrative—showing both the existing character and the vision for the future. We needed to balance architectural precision with artistic interpretation.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop',
  },

  goal: {
    title: 'Our Approach',
    description:
      'We developed a comprehensive visual strategy that combined aerial photography, ground-level architectural shots, and environmental context. The approach emphasized the interplay between old and new, using selective color and contrast to highlight the transformation narrative.',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop',
  },

  outcome: {
    title: 'The Result',
    description:
      'A cohesive portfolio of 150+ images that served as the foundation for marketing materials, investor presentations, and public documentation. The images were featured in architectural publications and helped secure additional development funding.',
  },

  resultImages: [
    {
      src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop',
      alt: 'Final result 1',
      caption: 'Twilight architectural shot',
    },
    {
      src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=800&fit=crop',
      alt: 'Final result 2',
      caption: 'Daytime perspective',
    },
    {
      src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=800&fit=crop',
      alt: 'Final result 3',
      caption: 'Detail photography',
    },
  ] as CarouselImage[],

  processImages: [
    {
      src: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=400&fit=crop',
      alt: 'Process 1',
      caption: 'Scout location',
    },
    {
      src: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop',
      alt: 'Process 2',
      caption: 'Set up equipment',
    },
    {
      src: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop',
      alt: 'Process 3',
      caption: 'Capture moments',
    },
    {
      src: 'https://images.unsplash.com/photo-1626344740294-cd8632dcdd5f?w=400&h=400&fit=crop',
      alt: 'Process 4',
      caption: 'Post-processing',
    },
    {
      src: 'https://images.unsplash.com/photo-1488538326705-74489c95b41b?w=400&h=400&fit=crop',
      alt: 'Process 5',
      caption: 'Final review',
    },
    {
      src: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=400&h=400&fit=crop',
      alt: 'Process 6',
      caption: 'Delivery',
    },
  ] as GalleryImage[],

  metrics: [
    {
      number: '150+',
      label: 'Photos Delivered',
    },
    {
      number: '3',
      label: 'Publications Featured',
    },
    {
      number: '40%',
      label: 'Increase in Funding',
    },
  ],

  testimonial: {
    text: 'The photography perfectly captured our vision for the project. The images helped us communicate the transformation to investors and the community in a way words never could.',
    author: 'Sarah Mitchell',
    role: 'Project Director',
  },
}

export interface CaseStudyTemplateProps {
  caseStudy?: typeof sampleCaseStudy
  className?: string
}

/**
 * CaseStudyTemplate - Complete, reusable case study page layout
 * 
 * Demonstrates:
 * - HeroWithImage for impactful entry
 * - CaseStudyFlow for narrative structure
 * - ImageCarousel for results showcase
 * - ImageGallery for process documentation
 * - Typography system for consistent styling
 * - ScrollReveal animations throughout
 */
export function CaseStudyTemplate({
  caseStudy = sampleCaseStudy,
  className = '',
}: CaseStudyTemplateProps) {
  return (
    <div className={cn('w-full', className)}>
      {/* Hero Section */}
      <HeroWithImage
        backgroundImage={caseStudy.heroImage}
        backgroundImageAlt="Case study hero"
        title={caseStudy.title}
        subtitle={caseStudy.subtitle}
        overlayOpacity={0.35}
        overlayColor="cerulean"
        height="large"
        parallax
      />

      {/* Project Metadata */}
      <section className="section-space-lg px-6 md:px-12 max-w-6xl mx-auto">
        <ScrollReveal trigger="slideUp">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            {/* Project Info Cards */}
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="pb-3">
                <Typography variant="metadata" className="text-brand-sage">
                  Year
                </Typography>
              </CardHeader>
              <CardContent>
                <Typography variant="body-lg" className="font-semibold">
                  {caseStudy.year}
                </Typography>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="pb-3">
                <Typography variant="metadata" className="text-brand-sage">
                  Category
                </Typography>
              </CardHeader>
              <CardContent>
                <Typography variant="body-lg" className="font-semibold">
                  {caseStudy.category}
                </Typography>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="pb-3">
                <Typography variant="metadata" className="text-brand-sage">
                  Client
                </Typography>
              </CardHeader>
              <CardContent>
                <Typography variant="body-lg" className="font-semibold">
                  {caseStudy.client}
                </Typography>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="pb-3">
                <Typography variant="metadata" className="text-brand-sage">
                  Tools
                </Typography>
              </CardHeader>
              <CardContent>
                <Typography variant="body-sm" className="space-y-1">
                  {caseStudy.tools.map((tool) => (
                    <div key={tool}>{tool}</div>
                  ))}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </ScrollReveal>
      </section>

      {/* Case Study Narrative Flow */}
      <section className="section-space-lg px-6 md:px-12 max-w-6xl mx-auto">
        <CaseStudyFlow>
          {/* Challenge Section */}
          <CaseStudySection
            type="challenge"
            title={caseStudy.challenge.title}
            description={caseStudy.challenge.description}
            image={{
              src: caseStudy.challenge.image,
              alt: caseStudy.challenge.title,
            }}
            layout="right"
            backgroundColor="muted"
          />

          {/* Goal Section */}
          <CaseStudySection
            type="goal"
            title={caseStudy.goal.title}
            description={caseStudy.goal.description}
            image={{
              src: caseStudy.goal.image,
              alt: caseStudy.goal.title,
            }}
            layout="left"
            backgroundColor="light"
          />

          {/* Outcome Section */}
          <CaseStudySection
            type="outcome"
            title={caseStudy.outcome.title}
            description={caseStudy.outcome.description}
            layout="full"
            backgroundColor="transparent"
          >
            {/* Results Carousel */}
            <div className="mt-8">
              <ImageCarousel
                images={caseStudy.resultImages}
                animationType="fade"
                showDots
                showArrows
                showCaptions
                autoPlay={false}
              />
            </div>
          </CaseStudySection>
        </CaseStudyFlow>
      </section>

      {/* Results Metrics */}
      <section className="section-space-lg px-6 md:px-12 max-w-6xl mx-auto">
        <ScrollRevealStagger staggerDelay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudy.metrics.map((metric) => (
              <Card
                key={metric.label}
                className="border-0 shadow-none bg-[#0B7AA1]/5 rounded-lg"
              >
                <CardContent className="pt-8">
                  <Typography
                    variant="section-title"
                    className="text-brand-cerulean mb-2"
                  >
                    {metric.number}
                  </Typography>
                  <Typography variant="label" className="text-muted-foreground">
                    {metric.label}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollRevealStagger>
      </section>

      {/* Process Documentation */}
      <section className="section-space-lg px-6 md:px-12 max-w-6xl mx-auto">
        <ScrollReveal trigger="slideUp" className="mb-12">
          <H2 className="mb-2">Behind the Scenes</H2>
          <P className="text-muted-foreground max-w-2xl">
            A glimpse into our creative process and the meticulous attention to detail
            that goes into every project.
          </P>
        </ScrollReveal>

        <ImageGallery
          images={caseStudy.processImages}
          columns={3}
          gap="lg"
          hoverEffect="zoom"
          showCaptions
        />
      </section>

      {/* Testimonial */}
      {caseStudy.testimonial && (
        <section className="section-space-xl px-6 md:px-12 max-w-4xl mx-auto">
          <ScrollReveal trigger="slideUp">
            <div className="text-center space-y-4">
              <Quote className="text-xl md:text-2xl border-0">
                &ldquo;{caseStudy.testimonial.text}&rdquo;
              </Quote>
              <div>
                <Typography variant="label" className="font-semibold">
                  {caseStudy.testimonial.author}
                </Typography>
                <Typography variant="caption">
                  {caseStudy.testimonial.role}
                </Typography>
              </div>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* Call to Action */}
      <section className="section-space-xl px-6 md:px-12 max-w-6xl mx-auto">
        <ScrollReveal trigger="slideUp">
          <Card className="border-0 shadow-sm bg-[#0B7AA1]/5">
            <CardHeader className="text-center">
              <CardTitle>Ready to start your project?</CardTitle>
              <CardDescription className="text-base">
                Let&apos;s collaborate to bring your vision to life with compelling photography and design.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center gap-4">
              <Button size="lg" className="bg-[#0B7AA1] hover:bg-[#1E9BCC]">
                Get Started
              </Button>
              <Button variant="outline" size="lg">
                View Portfolio
              </Button>
            </CardContent>
          </Card>
        </ScrollReveal>
      </section>
    </div>
  )
}
