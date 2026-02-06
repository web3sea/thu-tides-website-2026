# Implementation Guide - Photography Portfolio Design System

## Overview

A complete design system and component library has been implemented for your photography-focused portfolio website. This guide explains what's been built, where everything is located, and how to get started using it.

---

## What's Been Implemented

### Phase 1: Foundation ✅
- **Design Tokens**: Brand colors, spacing scale, typography system
- **Animation System**: Framer Motion integration + CSS utilities
- **Utilities**: Custom animation classes and spacing utilities

**Key File**: `app/globals.css`

### Phase 2: Core Components ✅
- **ScrollReveal**: Scroll-triggered entrance animations
- **Typography System**: CVA-based typography with semantic HTML
- **HeroWithImage**: Full-featured hero section with parallax
- **ImageCarousel**: Photography carousel with multiple animation types
- **ImageGallery**: Responsive grid gallery with lightbox
- **CaseStudySection**: Narrative sections (Challenge/Goal/Outcome)

**Location**: `components/`

### Phase 3: Page Template ✅
- **CaseStudyTemplate**: Complete case study page example
- **Live Demo**: Home page (`app/page.tsx`) now uses the template

**Location**: `components/case-study-template.tsx`

### Phase 4: Documentation ✅
- **Design System Docs**: Complete reference guide
- **Implementation Guide**: This file
- **Code Comments**: Well-documented components with examples

---

## File Structure

```
project/
├── app/
│   ├── globals.css                 # Design tokens, utilities, animations
│   ├── layout.tsx                  # Root layout with fonts
│   ├── page.tsx                    # Homepage (case study demo)
│   └── page.tsx
│
├── components/
│   ├── typography.tsx              # Typography system (H1-H3, P, Caption, etc.)
│   ├── scroll-reveal.tsx           # Scroll animation wrappers
│   ├── hero-with-image.tsx         # Hero section component
│   ├── image-carousel.tsx          # Photography carousel
│   ├── image-gallery.tsx           # Grid gallery with lightbox
│   ├── case-study-section.tsx      # Case study narrative sections
│   ├── case-study-template.tsx     # Complete page template
│   │
│   └── ui/                         # ChadCN components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── dialog.tsx
│       └── ... (other shadcn components)
│
├── lib/
│   └── utils.ts                    # Utility functions (cn, etc.)
│
├── package.json                    # Dependencies
├── DESIGN_SYSTEM.md               # Complete design reference
└── IMPLEMENTATION_GUIDE.md        # This file
```

---

## Quick Start - Building Your First Case Study

### 1. Create a Case Study Data Structure

```typescript
// pages/case-studies/urban-renewal.tsx
import { CaseStudyTemplate } from '@/components/case-study-template'

const projectData = {
  title: 'Your Project Title',
  subtitle: 'Your project tagline',
  heroImage: '/images/hero.jpg',
  year: 2024,
  category: 'Photography Type',
  client: 'Client Name',
  tools: ['Camera', 'Software', 'Technique'],

  challenge: {
    title: 'The Challenge',
    description: 'What was the problem...',
    image: '/images/challenge.jpg',
  },

  goal: {
    title: 'Our Approach',
    description: 'How did you solve it...',
    image: '/images/approach.jpg',
  },

  outcome: {
    title: 'The Result',
    description: 'What did you achieve...',
  },

  resultImages: [
    {
      src: '/images/result1.jpg',
      alt: 'Result 1',
      caption: 'Twilight shot',
    },
    // ... more images
  ],

  processImages: [
    {
      src: '/images/process1.jpg',
      alt: 'Process 1',
      caption: 'Scout location',
    },
    // ... more images
  ],

  metrics: [
    { number: '50+', label: 'Photos Delivered' },
    { number: '3', label: 'Awards Won' },
    { number: '95%', label: 'Client Satisfaction' },
  ],

  testimonial: {
    text: 'What the client said...',
    author: 'Client Name',
    role: 'Client Role',
  },
}

export default function CaseStudyPage() {
  return <CaseStudyTemplate caseStudy={projectData} />
}
```

### 2. Use Components Individually

```tsx
import { HeroWithImage } from '@/components/hero-with-image'
import { CaseStudySection } from '@/components/case-study-section'
import { ImageCarousel } from '@/components/image-carousel'
import { ImageGallery } from '@/components/image-gallery'
import { Typography, H2, P } from '@/components/typography'
import { ScrollReveal } from '@/components/scroll-reveal'

export default function CustomPage() {
  return (
    <>
      {/* Hero */}
      <HeroWithImage
        backgroundImage="/hero.jpg"
        title="Page Title"
        subtitle="Subtitle"
        overlayOpacity={0.3}
        height="large"
      />

      {/* Content Section */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto section-space-lg">
        <ScrollReveal trigger="slideUp">
          <H2>Section Title</H2>
          <P>Content here...</P>
        </ScrollReveal>

        {/* Case Study Narrative */}
        <CaseStudySection
          type="challenge"
          title="Challenge"
          description="..."
          image={{ src: '/image.jpg', alt: '...' }}
        />
      </section>

      {/* Gallery */}
      <ImageGallery
        images={projectImages}
        columns={3}
        gap="lg"
      />
    </>
  )
}
```

---

## Key Design System Features

### 1. Color System

**Brand Colors** (automatically available as CSS variables):

```css
--brand-cerulean: #0B7AA1;        /* Primary CTA color */
--brand-cerulean-2: #1E9BCC;      /* Hover state */
--brand-sage-dry: #8FA998;        /* Metadata, borders */
--brand-olive-leaf: #7A8F4A;      /* Accents, highlights */
```

**Usage**:
```tsx
<div className="bg-[var(--brand-cerulean)]">...</div>
<Typography className="text-brand-cerulean">...</Typography>
<div className="border-brand-sage">...</div>
```

### 2. Typography Hierarchy

```tsx
import { Typography, H1, H2, H3, P, Caption, Quote } from '@/components/typography'

// Convenience components
<H1>Hero Title</H1>          // text-7xl light weight
<H2>Section Title</H2>        // text-5xl light weight
<H3>Subsection Title</H3>     // text-3xl light weight
<P>Body text</P>              // text-base normal weight

// Or use Typography directly
<Typography variant="hero-title">Custom Title</Typography>
<Typography variant="case-intro">Intro paragraph</Typography>
<Typography variant="case-body">Body content</Typography>
<Typography variant="metadata">METADATA TEXT</Typography>
<Caption>Image caption</Caption>
<Quote>Testimonial quote</Quote>
```

### 3. Spacing Scale

```tsx
// Use CSS variables for consistent spacing
<div className="my-[var(--space-lg)]">Spaced section</div>
<div className="section-space-lg">Large section spacing</div>
<div className="section-space-md">Medium section spacing</div>

// Or standard Tailwind
<div className="mt-8 mb-12">...</div>
```

### 4. Animation System

**Scroll Triggers**:
```tsx
import { ScrollReveal } from '@/components/scroll-reveal'

<ScrollReveal trigger="slideUp" duration={0.8}>
  <h2>Animates in when scrolled into view</h2>
</ScrollReveal>

// Stagger effect for multiple items
<ScrollRevealStagger staggerDelay={0.1}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ScrollRevealStagger>
```

**Framer Motion**:
```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  Content
</motion.div>
```

**CSS Classes**:
```tsx
<div className="animate-fade-in">...</div>
<div className="animate-slide-up">...</div>
<div className="animate-slide-left">...</div>
<div className="animate-scale-in">...</div>
<div className="animate-gentle-pulse">...</div>
```

---

## Component Reference

### ScrollReveal
**Scroll-triggered entrance animations**
- Triggers: `fade`, `slideUp`, `slideLeft`, `slideRight`, `scaleIn`, `zoomIn`
- Props: `trigger`, `duration`, `delay`, `once`, `threshold`

### HeroWithImage
**Full-featured hero section with parallax**
- Props: `backgroundImage`, `title`, `subtitle`, `overlayOpacity`, `overlayColor`, `height`, `parallax`
- Heights: `small`, `medium`, `large`, `full`
- Overlays: `dark`, `light`, `cerulean`, `none`

### ImageCarousel
**Photography showcase carousel**
- Props: `images`, `animationType`, `autoPlay`, `showDots`, `showArrows`, `showCaptions`, `quality`
- Animations: `fade`, `slide`, `zoom`

### ImageGallery
**Responsive image grid with lightbox**
- Props: `images`, `columns`, `gap`, `hoverEffect`, `showCaptions`, `onImageClick`
- Columns: 2, 3, 4
- Gaps: `sm`, `md`, `lg`
- Hover Effects: `zoom`, `overlay`, `lift`, `none`

### CaseStudySection
**Challenge/Goal/Outcome narrative sections**
- Props: `type`, `title`, `description`, `image`, `layout`, `accent`, `backgroundColor`
- Types: `challenge`, `goal`, `outcome`
- Layouts: `left`, `right`, `full`
- Accents: `cerulean`, `sage`, `olive`
- Backgrounds: `light`, `muted`, `transparent`

### Typography
**Semantic typography system**
- Variants: `hero-title`, `hero-subtitle`, `section-title`, `case-body`, `caption`, `quote`, etc.
- Props: `align`, `color`
- Aligns: `left`, `center`, `right`, `justify`
- Colors: `default`, `muted`, `primary`, `accent`

---

## Next Steps & Customization

### 1. Update Brand Colors

Edit `app/globals.css`:
```css
:root {
  --brand-cerulean: #YOUR_COLOR;
  --brand-cerulean-2: #YOUR_COLOR_2;
  /* ... */
}
```

### 2. Customize Typography

Edit `components/typography.tsx` to change:
- Font families
- Font sizes
- Font weights
- Line heights

### 3. Add Custom Animations

Edit `app/globals.css` to add new keyframe animations:
```css
@keyframes yourAnimation {
  from { /* ... */ }
  to { /* ... */ }
}

.animate-your-animation {
  animation: yourAnimation 0.8s ease-out;
}
```

### 4. Create Page Templates

Create new page structures by combining components:
```tsx
export default function AboutPage() {
  return (
    <>
      <HeroWithImage backgroundImage={...} title="About" />
      <section>
        <ScrollReveal>
          <H2>Your Story</H2>
          <P>Biography...</P>
        </ScrollReveal>
      </section>
      <ImageGallery images={teamPhotos} />
    </>
  )
}
```

### 5. Optimize Images

Always use Next.js Image component:
```tsx
import Image from 'next/image'

<Image
  src="/photo.jpg"
  alt="Descriptive alt text"
  width={1920}
  height={1080}
  quality={85}
  placeholder="blur"
  priority={isAboveTheFold}
  sizes="(max-width: 768px) 100vw, 80vw"
/>
```

---

## Performance Considerations

### Image Optimization
- Quality: 85 for photography, 75 for UI
- Lazy loading for below-fold images
- Proper `sizes` attributes for responsive images
- Blur placeholders for smooth loading

### Animation Performance
- Test animations on mobile devices
- Use `will-change` sparingly
- Keep animations under 1.2 seconds
- Respect `prefers-reduced-motion`

### Bundle Size
- Framer Motion is ~50kb (gzipped)
- Tree-shake unused components
- Use dynamic imports for non-critical components

---

## Accessibility Checklist

- [ ] All images have descriptive alt text
- [ ] Color contrast meets WCAG AA standards
- [ ] Typography scale is accessible
- [ ] Interactive elements are keyboard navigable
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Focus states are visible
- [ ] Semantic HTML is used throughout

---

## Integration with Builder.io

### Registering Components

To use these components in Builder.io:

```typescript
import Builder from '@builder.io/react'
import { ImageCarousel } from '@/components/image-carousel'
import { CaseStudySection } from '@/components/case-study-section'

Builder.registerComponent(ImageCarousel, {
  name: 'Image Carousel',
  inputs: [
    { name: 'images', type: 'list', defaultValue: [] },
    { name: 'animationType', type: 'string', defaultValue: 'fade' },
  ],
})

Builder.registerComponent(CaseStudySection, {
  name: 'Case Study Section',
  inputs: [
    { name: 'type', type: 'string', defaultValue: 'challenge' },
    { name: 'title', type: 'string' },
    // ... other inputs
  ],
})
```

### Design Tokens in Builder

Configure color palette in Builder settings:
- Map CSS variables to design tokens
- Create reusable color sets
- Enable designers to use brand colors

---

## Troubleshooting

### Animations Not Working
1. Check if Framer Motion is installed: `npm list framer-motion`
2. Ensure `'use client'` is at top of component
3. Check browser support (all modern browsers supported)

### Images Not Loading
1. Verify image paths are correct
2. Check Next.js image configuration
3. Ensure image is publicly accessible
4. Check image dimensions

### Typography Not Applying
1. Verify component is imported correctly
2. Check Tailwind CSS is processing files
3. Ensure variant name is correct

### Performance Issues
1. Check image file sizes (optimize with tools like TinyPNG)
2. Reduce number of animations on page
3. Use lazy loading for images
4. Test with DevTools Lighthouse

---

## Resources

- **Framer Motion**: https://www.framer.com/motion/
- **Tailwind CSS**: https://tailwindcss.com/
- **Next.js Docs**: https://nextjs.org/
- **Design System Docs**: See `DESIGN_SYSTEM.md`

---

## Getting Help

Each component has JSDoc comments with usage examples. Hover over component names in your IDE to see documentation.

For detailed component reference, see `DESIGN_SYSTEM.md`.

---

**Happy building! 🚀**
