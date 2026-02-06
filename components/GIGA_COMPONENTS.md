# Giga Components

Enterprise-focused UI components inspired by modern SaaS landing pages.

## Components

### Navigation (`navigation.tsx`)

Navigation bar with dropdown menus and glassmorphism effects.

**Features:**
- Hover-activated dropdown menus with smooth animations
- Glassmorphic design with backdrop blur
- Responsive layout
- Material Symbols icons

**Usage:**
```tsx
import { Navigation } from '@/components/navigation'

<Navigation />
```

### GigaHero (`giga-hero.tsx`)

Full-screen hero section with dramatic background imagery.

**Features:**
- Background image with gradient overlays
- Animated badge, title, and CTA
- Logo showcase section
- Fully customizable content
- Framer Motion animations

**Usage:**
```tsx
import { GigaHero } from '@/components/giga-hero'

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
```

**Props:**
- `backgroundImage` - Hero background image URL
- `backgroundImageAlt` - Alt text for background image
- `badge` - Optional badge with text and link
- `title` - Main heading
- `subtitle` - Supporting text
- `ctaText` - Call-to-action button text
- `ctaHref` - CTA button link
- `logos` - Array of company logos to display
- `className` - Additional CSS classes

### GigaLayout (`giga-layout.tsx`)

Layout wrapper that combines navigation with page content.

**Usage:**
```tsx
import { GigaLayout } from '@/components/giga-layout'
import { GigaHero } from '@/components/giga-hero'

export default function Page() {
  return (
    <GigaLayout>
      <GigaHero {...heroProps} />
      <section>Your content</section>
    </GigaLayout>
  )
}
```

## Example Pages

1. **Basic Example:** `/app/giga/page.tsx`
   - Simple page with navigation and hero

2. **Full Demo:** `/app/giga-demo/page.tsx`
   - Complete landing page with hero, features, and CTA sections
   - Shows integration with existing components (ScrollReveal, Card, etc.)

## Requirements

These components require:
- Framer Motion (`framer-motion`)
- Material Symbols font (added to layout.tsx)
- Existing shadcn/ui components (Button, Card)

## Design System

The components use:
- **Colors:** Slate/gray palette with white accents
- **Typography:** Serif for headings, sans-serif for body
- **Effects:** Glassmorphism, backdrop blur, gradient overlays
- **Animations:** Smooth transitions and entrance animations via Framer Motion
