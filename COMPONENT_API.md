# Component API Reference - Quick Guide

## ScrollReveal

```tsx
import { ScrollReveal, ScrollRevealStagger } from '@/components/scroll-reveal'

<ScrollReveal
  trigger="slideUp"          // 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'zoomIn'
  duration={0.8}             // seconds
  delay={0}                  // seconds
  once={true}                // trigger only once
  threshold={0.1}            // 0-1, how much visible to trigger
  className=""
>
  {children}
</ScrollReveal>

<ScrollRevealStagger
  trigger="slideUp"
  duration={0.8}
  staggerDelay={0.1}         // delay between children
  once={true}
  threshold={0.1}
  className=""
>
  {/* Children animate in sequence */}
</ScrollRevealStagger>
```

---

## Typography

```tsx
import { Typography, H1, H2, H3, P, Caption, Quote } from '@/components/typography'

// Quick convenience components
<H1>Hero Title</H1>
<H2>Section Title</H2>
<H3>Subsection Title</H3>
<P>Body paragraph</P>
<Caption>Image caption</Caption>
<Quote>Client testimonial</Quote>

// Or use Typography with variants
<Typography
  variant="hero-title"        // See variants below
  align="center"              // 'left' | 'center' | 'right' | 'justify'
  color="muted"               // 'default' | 'muted' | 'primary' | 'accent'
  as="p"                      // HTML element override
>
  Custom typography
</Typography>

/* VARIANTS:
  hero-title, hero-subtitle,
  section-title, subsection-title,
  case-intro, case-body,
  body-lg, body, body-sm,
  metadata, label,
  caption, caption-sm,
  accent-primary, accent-secondary,
  quote, quote-sm
*/
```

---

## HeroWithImage

```tsx
import { HeroWithImage, HeroWithImageAndCTA } from '@/components/hero-with-image'

<HeroWithImage
  backgroundImage="/hero.jpg"           // required
  backgroundImageAlt="Hero image"       // optional
  title="Page Title"                    // required
  subtitle="Tagline"                    // optional
  overlayOpacity={0.3}                  // 0-1
  overlayColor="cerulean"               // 'dark' | 'light' | 'cerulean' | 'none'
  height="large"                        // 'small' | 'medium' | 'large' | 'full'
  parallax={true}                       // scroll parallax effect
  animationTrigger="load"               // 'load' | 'scroll'
  content={<CustomComponent />}         // optional
  className=""
/>

<HeroWithImageAndCTA
  backgroundImage="/hero.jpg"
  title="Call to Action"
  ctaText="Get Started"                 // button text
  ctaHref="/contact"                    // button link
  onCtaClick={() => {}}                 // button click handler
  {...otherProps}
/>
```

---

## ImageCarousel

```tsx
import { ImageCarousel } from '@/components/image-carousel'

interface CarouselImage {
  src: string
  alt: string
  caption?: string
  aspectRatio?: 'square' | 'landscape' | 'portrait' | 'video'
}

<ImageCarousel
  images={carouselImages}               // required
  animationType="fade"                  // 'fade' | 'slide' | 'zoom'
  autoPlay={false}                      // auto-advance
  autoPlayInterval={5000}               // milliseconds
  showDots={true}                       // dot indicators
  showArrows={true}                     // navigation arrows
  showCaptions={true}                   // image captions
  quality={85}                          // image quality 1-100
  priority={false}                      // load priority
  onImageChange={(index) => {}}         // callback
  className=""
/>
```

---

## ImageGallery

```tsx
import { ImageGallery, MasonryGallery } from '@/components/image-gallery'

interface GalleryImage {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

<ImageGallery
  images={galleryImages}                // required
  columns={3}                           // 2 | 3 | 4
  gap="md"                              // 'sm' | 'md' | 'lg'
  hoverEffect="zoom"                    // 'zoom' | 'overlay' | 'lift' | 'none'
  quality={85}                          // image quality
  showCaptions={false}                  // show image captions
  onImageClick={(index, image) => {}}   // lightbox callback
  className=""
/>

<MasonryGallery
  images={galleryImages}                // Pinterest-style masonry
  gap="lg"
  quality={85}
  showCaptions={true}
  onImageClick={(index, image) => {}}
  className=""
/>
```

---

## CaseStudySection & CaseStudyFlow

```tsx
import { CaseStudySection, CaseStudyFlow } from '@/components/case-study-section'

<CaseStudyFlow>
  <CaseStudySection
    type="challenge"                    // 'challenge' | 'goal' | 'outcome'
    title="The Challenge"               // required
    description="Problem statement"     // required
    image={{
      src: '/image.jpg',
      alt: 'Challenge image'
    }}
    layout="right"                      // 'left' | 'right' | 'full'
    accent="cerulean"                   // 'cerulean' | 'sage' | 'olive'
    backgroundColor="muted"             // 'light' | 'muted' | 'transparent'
    className=""
  >
    {/* Optional additional content */}
  </CaseStudySection>

  {/* Sections are automatically separated by animated dividers */}

  <CaseStudySection
    type="goal"
    title="Our Approach"
    description="Solution explanation"
    layout="left"
  />

  <CaseStudySection
    type="outcome"
    title="The Result"
    description="Achievement summary"
    layout="full"
  >
    <ImageCarousel images={results} />
  </CaseStudySection>
</CaseStudyFlow>
```

---

## CaseStudyTemplate (Full Page)

```tsx
import { CaseStudyTemplate } from '@/components/case-study-template'

interface CaseStudyData {
  title: string
  subtitle: string
  heroImage: string
  year: number
  category: string
  client: string
  tools: string[]
  challenge: { title, description, image }
  goal: { title, description, image }
  outcome: { title, description }
  resultImages: CarouselImage[]
  processImages: GalleryImage[]
  metrics: { number, label }[]
  testimonial?: { text, author, role }
}

<CaseStudyTemplate
  caseStudy={caseStudyData}             // optional, uses sample if omitted
  className=""
/>
```

---

## Color System Usage

```tsx
// CSS Variables (use in any component)
<div className="bg-[var(--brand-cerulean)]">...</div>
<div className="text-[var(--brand-sage-dry)]">...</div>
<div className="border-[var(--brand-olive-leaf)]">...</div>

// Utility Classes
<div className="text-brand-cerulean">Cerulean text</div>
<div className="text-brand-sage">Sage text</div>
<div className="text-brand-olive">Olive text</div>
<div className="border-brand-cerulean">Cerulean border</div>
<div className="border-brand-sage">Sage border</div>
<div className="bg-brand-accent-light">Light cerulean background</div>

// Direct hex values
<div className="bg-[#0B7AA1]">...</div>
<div className="text-[#8FA998]">...</div>
```

---

## Spacing Utilities

```tsx
// CSS Variables
<div className="my-[var(--space-lg)]">Large vertical spacing</div>

// Convenience Classes
<div className="section-space-lg">Large section spacing (96px)</div>
<div className="section-space-md">Medium section spacing (64px)</div>
<div className="section-space-sm">Small section spacing (32px)</div>

<div className="image-container-lg">Large image container (my-96)</div>
<div className="image-container-md">Medium image container (my-64)</div>

// Standard Tailwind
<div className="mt-8 mb-12">...</div>
<div className="p-6 md:p-12">...</div>
```

---

## Animation Utilities

```tsx
// CSS Classes
<div className="animate-fade-in">Fade in</div>
<div className="animate-slide-up">Slide up</div>
<div className="animate-slide-left">Slide left</div>
<div className="animate-slide-right">Slide right</div>
<div className="animate-scale-in">Scale in</div>
<div className="animate-gentle-pulse">Gentle pulse</div>

// Framer Motion
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
>
  Animated content
</motion.div>

<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Interactive element
</motion.div>
```

---

## Image Component (Next.js)

```tsx
import Image from 'next/image'

<Image
  src="/photo.jpg"                      // required
  alt="Descriptive alt text"            // required
  width={1920}                          // required
  height={1080}                         // required
  quality={85}                          // 1-100, default 75
  priority={false}                      // load priority
  placeholder="blur"                    // show blur while loading
  sizes="(max-width: 768px) 100vw, 80vw"
  className="object-cover"
/>
```

---

## ChadCN UI Components

Pre-installed and available:

```tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
```

---

## Common Patterns

### Hero + Content
```tsx
<HeroWithImage backgroundImage="/hero.jpg" title="Page" />
<section className="px-6 md:px-12 max-w-6xl mx-auto section-space-lg">
  <ScrollReveal trigger="slideUp">
    <H2>Content Title</H2>
    <P>Content paragraph...</P>
  </ScrollReveal>
</section>
```

### Full Case Study
```tsx
<CaseStudyTemplate caseStudy={data} />
```

### Image Showcase
```tsx
<section className="section-space-lg">
  <ImageCarousel images={images} />
</section>

<section className="section-space-lg">
  <ImageGallery images={images} columns={3} />
</section>
```

### Testimonial Block
```tsx
<ScrollReveal trigger="slideUp">
  <Quote className="text-center text-xl md:text-2xl">
    "{testimonial.text}"
  </Quote>
  <div className="text-center mt-4">
    <Typography variant="label">{testimonial.author}</Typography>
    <Typography variant="caption">{testimonial.role}</Typography>
  </div>
</ScrollReveal>
```

---

## Import Cheat Sheet

```tsx
// Core System
import { Typography, H1, H2, H3, P, Caption, Quote } from '@/components/typography'
import { ScrollReveal, ScrollRevealStagger } from '@/components/scroll-reveal'

// Page Sections
import { HeroWithImage, HeroWithImageAndCTA } from '@/components/hero-with-image'
import { CaseStudySection, CaseStudyFlow } from '@/components/case-study-section'
import { CaseStudyTemplate } from '@/components/case-study-template'

// Galleries
import { ImageCarousel } from '@/components/image-carousel'
import { ImageGallery, MasonryGallery } from '@/components/image-gallery'

// Utilities
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import Image from 'next/image'

// UI Components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
```

---

**Last Updated**: 2024
**Version**: 1.0.0
