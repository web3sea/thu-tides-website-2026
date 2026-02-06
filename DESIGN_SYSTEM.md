# Photography Portfolio Design System

A comprehensive design system for photography-focused portfolio websites built with Next.js, Tailwind CSS, and Framer Motion.

## Table of Contents

1. [Color System](#color-system)
2. [Typography](#typography)
3. [Components](#components)
4. [Animation System](#animation-system)
5. [Spacing Scale](#spacing-scale)
6. [Best Practices](#best-practices)

---

## Color System

### Brand Colors

The design system uses four primary brand colors optimized for photography:

```css
--brand-cerulean: #0B7AA1;        /* Primary accent - photography complement */
--brand-cerulean-2: #1E9BCC;      /* Lighter variant - interactive states */
--brand-sage-dry: #8FA998;        /* Muted tone - text/borders, never dominates */
--brand-olive-leaf: #7A8F4A;      /* Earthy anchor - warm counter-balance */
```

### Usage Guidelines

| Element | Color | Reasoning |
|---------|-------|-----------|
| **CTA Buttons** | Cerulean (#0B7AA1) | High contrast, acts as visual anchor |
| **Hover States** | Cerulean-2 (#1E9BCC) | Clear feedback without distraction |
| **Text Metadata** | Sage-dry (#8FA998) | Recedes, doesn't compete with images |
| **Accent Elements** | Olive-leaf (#7A8F4A) | Warm tone balances cool cerulean |
| **Borders/Dividers** | Sage-dry @ 15-20% | Subtle structure |
| **Overlay Tints** | Cerulean @ 5-10% | Photography enhancement, not replacement |

### Dark Mode

In dark mode, colors shift to maintain contrast:
- Primary accent uses Cerulean-2 (lighter)
- Sage and Olive shift to lighter variants
- Overlays adjust for dark backgrounds

---

## Typography

### System Fonts

- **Primary**: Inter (system fallback: -apple-system, BlinkMacSystemFont)
- **Accent** (optional): Playfair Display or Crimson Text
- **Code**: JetBrains Mono

### Typography Variants

```tsx
import { Typography, H1, H2, H3, P, Caption, Quote } from '@/components/typography'

// Hero Section
<Typography variant="hero-title">Welcome to Our Studio</Typography>
<Typography variant="hero-subtitle">Award-winning photography</Typography>

// Section Headers
<H2>Featured Work</H2>
<H3>Project Details</H3>

// Body Content
<P>Project description with full content...</P>
<Typography variant="case-intro">Introduction paragraph</Typography>
<Typography variant="case-body">Body text for case studies</Typography>

// Special Elements
<Caption>Image caption text</Caption>
<Quote>Client testimonial quote</Quote>
```

### Font Weights

- **Light** (300): Hero titles, subtitles, case study bodies
- **Normal** (400): Body text, captions
- **Medium** (500): Labels, metadata, navigation
- **Semibold** (600): Accent text, highlights

### Text Alignment & Color

```tsx
<Typography 
  variant="case-body" 
  align="center"
  color="muted"
>
  Centered, muted text
</Typography>
```

---

## Components

### ScrollReveal - Scroll-Triggered Animations

Wraps content with scroll-triggered entrance animations.

```tsx
import { ScrollReveal, ScrollRevealStagger } from '@/components/scroll-reveal'

// Single element
<ScrollReveal trigger="slideUp" duration={0.8}>
  <h2>Animated heading</h2>
</ScrollReveal>

// Multiple children with stagger
<ScrollRevealStagger trigger="slideUp" staggerDelay={0.1}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ScrollRevealStagger>
```

**Available Triggers**: `fade`, `slideUp`, `slideLeft`, `slideRight`, `scaleIn`, `zoomIn`

### HeroWithImage - Full-Featured Hero Section

Photography-first hero with parallax, overlay, and animations.

```tsx
import { HeroWithImage, HeroWithImageAndCTA } from '@/components/hero-with-image'

<HeroWithImage
  backgroundImage="/hero.jpg"
  backgroundImageAlt="Hero background"
  title="Welcome to Our Studio"
  subtitle="Award-winning photography and design"
  overlayOpacity={0.3}
  overlayColor="cerulean"
  height="large"  // 'small' | 'medium' | 'large' | 'full'
  parallax
/>

// With CTA Button
<HeroWithImageAndCTA
  backgroundImage="/hero.jpg"
  title="Start Your Project"
  ctaText="Get Started"
  ctaHref="/contact"
/>
```

### ImageCarousel - Photography Showcase

Smooth carousel for case study image galleries.

```tsx
import { ImageCarousel } from '@/components/image-carousel'

const images = [
  { src: '/photo1.jpg', alt: 'Photo 1', caption: 'Twilight shot' },
  { src: '/photo2.jpg', alt: 'Photo 2', caption: 'Detail work' },
]

<ImageCarousel
  images={images}
  animationType="fade"  // 'fade' | 'slide' | 'zoom'
  showDots
  showArrows
  showCaptions
  autoPlay={false}
  quality={85}
  onImageChange={(index) => console.log(index)}
/>
```

### ImageGallery - Responsive Grid Gallery

Grid-based gallery with optional hover effects and lightbox.

```tsx
import { ImageGallery, MasonryGallery } from '@/components/image-gallery'

// Regular grid
<ImageGallery
  images={projectImages}
  columns={3}  // 2, 3, or 4
  gap="lg"     // 'sm', 'md', 'lg'
  hoverEffect="zoom"  // 'zoom' | 'overlay' | 'lift' | 'none'
  showCaptions
  onImageClick={(index, image) => console.log(index)}
/>

// Masonry layout (Pinterest-style)
<MasonryGallery
  images={projectImages}
  gap="lg"
  showCaptions
/>
```

### CaseStudySection - Narrative Sections

Handles Challenge, Goal, and Outcome sections with flexible layouts.

```tsx
import { CaseStudySection, CaseStudyFlow } from '@/components/case-study-section'

<CaseStudyFlow>
  <CaseStudySection
    type="challenge"  // 'challenge' | 'goal' | 'outcome'
    title="The Challenge"
    description="Client needed to..."
    image={{ src: '/challenge.jpg', alt: 'Challenge' }}
    layout="right"  // 'left' | 'right' | 'full'
    accent="cerulean"  // 'cerulean' | 'sage' | 'olive'
    backgroundColor="muted"  // 'light' | 'muted' | 'transparent'
  />
  
  {/* Divider automatically added between sections */}
  
  <CaseStudySection
    type="goal"
    title="Our Approach"
    description="We developed..."
    image={{ src: '/goal.jpg', alt: 'Approach' }}
    layout="left"
  />
</CaseStudyFlow>
```

---

## Animation System

### Framer Motion Integration

The design system uses Framer Motion for complex animations.

```tsx
import { motion } from 'framer-motion'

// Basic animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
>
  Content
</motion.div>

// Stagger effect
<motion.div
  variants={{
    visible: { transition: { staggerChildren: 0.1 } },
    hidden: {}
  }}
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 }
      }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

### CSS Animation Classes

Built-in Tailwind animation utilities:

```tsx
<div className="animate-fade-in">Fade in</div>
<div className="animate-slide-up">Slide up</div>
<div className="animate-slide-left">Slide left</div>
<div className="animate-slide-right">Slide right</div>
<div className="animate-scale-in">Scale in</div>
<div className="animate-gentle-pulse">Gentle pulse</div>
```

### Animation Best Practices

1. **Durations**: Keep animations between 0.4-1.2 seconds
2. **Easing**: Use `ease-out` for entrances, `ease-in-out` for continuous
3. **Images**: Keep animations subtle (max scale 1.1, max translate 30px)
4. **Performance**: Use `will-change` sparingly, test on mobile
5. **Hierarchy**: Stagger child animations by 0.1-0.2 seconds

---

## Spacing Scale

Based on 8px base unit:

```css
--space-xs: 0.5rem;     /* 8px - micro spacing */
--space-sm: 1rem;       /* 16px - within sections */
--space-md: 1.5rem;     /* 24px - standard spacing */
--space-lg: 2rem;       /* 32px - between sections */
--space-xl: 4rem;       /* 64px - major sections */
--space-2xl: 6rem;      /* 96px - generous breathing */
--space-3xl: 8rem;      /* 128px - very generous */
```

### Utility Classes

```tsx
<div className="section-space-lg">Large section spacing</div>
<div className="section-space-md">Medium section spacing</div>
<div className="section-space-sm">Small section spacing</div>

<div className="image-container-lg">Large image container</div>
<div className="image-container-md">Medium image container</div>
```

---

## Best Practices

### Image Optimization

Always use Next.js Image component with proper props:

```tsx
import Image from 'next/image'

<Image
  src={photo}
  alt="Descriptive alt text"
  width={1920}
  height={1080}
  quality={85}
  placeholder="blur"
  priority={isAboveTheFold}
  sizes="(max-width: 768px) 100vw, 80vw"
/>
```

### Whitespace

- Maintain 20%+ whitespace ratio on case study pages
- Use 2:1 image-to-text ratio for visual focus
- Single-column layout for images (full bleed impact)
- Text max-width: 65ch for readability

### Color Application

1. **Don't** place solid color blocks next to images
2. **Do** use color as accent, not container
3. **Keep** overlays subtle (5-10% opacity)
4. **Avoid** competing with photography saturation

### Accessibility

- Always provide descriptive alt text for images
- Use semantic HTML (Typography component handles this)
- Ensure color contrast meets WCAG AA standards
- Test animations with `prefers-reduced-motion`

### Performance

```tsx
// Lazy load non-critical images
<Image
  src={photo}
  alt="..."
  loading="lazy"
/>

// Use proper image sizes
sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"

// Optimize quality
quality={85}  // Photography: 85, UI: 75
```

---

## File Structure

```
components/
├── typography.tsx              # Typography system
├── scroll-reveal.tsx           # Scroll animations
├── hero-with-image.tsx         # Hero section
├── image-carousel.tsx          # Photography carousel
├── image-gallery.tsx           # Gallery grids
├── case-study-section.tsx      # Case study narrative
├── case-study-template.tsx     # Full page template
└── ui/                         # ChadCN components
    ├── button.tsx
    ├── card.tsx
    └── ...

app/
├── globals.css                 # Design tokens, utilities
├── layout.tsx
└── page.tsx                    # Example case study
```

---

## Customization Guide

### Adding Brand Colors

Edit `app/globals.css`:

```css
:root {
  --brand-color-name: #HEXCODE;
}

.dark {
  --brand-color-name: #HEXCODE;
}
```

Then use in components:

```tsx
<div className="bg-[var(--brand-color-name)]">Content</div>
```

### Creating New Typography Variants

Edit `components/typography.tsx`:

```tsx
const typographyVariants = cva('', {
  variants: {
    variant: {
      'custom-style': 'text-xl font-bold tracking-wide',
    }
  }
})
```

### Extending Animations

Add new keyframes to `app/globals.css`:

```css
@keyframes customAnimation {
  from { /* ... */ }
  to { /* ... */ }
}

.animate-custom {
  animation: customAnimation 0.8s ease-out;
}
```

---

## Resources

- **Framer Motion**: https://www.framer.com/motion/
- **Tailwind CSS**: https://tailwindcss.com/
- **Next.js Image**: https://nextjs.org/docs/app/api-reference/components/image
- **Base UI**: https://base-ui.com/
- **Hugeicons**: https://hugeicons.com/

---

**Version**: 1.0.0
**Last Updated**: 2024
**Maintained By**: Design Team
