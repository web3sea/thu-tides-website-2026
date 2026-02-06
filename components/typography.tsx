'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Typography variants for the design system
 * Supports hero, section headers, body text, captions, and metadata
 */
const typographyVariants = cva('w-full', {
  variants: {
    variant: {
      // Hero Section
      'hero-title': 'text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter leading-tight',
      'hero-subtitle': 'text-lg md:text-2xl font-light text-muted-foreground tracking-wide',

      // Section Headers
      'section-title': 'text-4xl md:text-5xl font-light tracking-tight leading-tight',
      'subsection-title': 'text-2xl md:text-3xl font-light tracking-normal',

      // Case Study Content
      'case-intro': 'text-base md:text-lg leading-relaxed font-light text-foreground/95',
      'case-body': 'text-base leading-relaxed text-foreground/90 font-light',

      // General Body
      'body-lg': 'text-lg leading-relaxed font-light',
      'body': 'text-base leading-relaxed font-normal',
      'body-sm': 'text-sm leading-relaxed font-normal text-foreground/85',

      // Metadata & Labels
      'metadata': 'text-xs md:text-sm uppercase tracking-widest font-medium text-muted-foreground',
      'label': 'text-sm font-medium text-foreground',

      // Captions
      'caption': 'text-sm italic text-muted-foreground/80 leading-relaxed',
      'caption-sm': 'text-xs text-muted-foreground/70 italic',

      // Accent Text
      'accent-primary': 'text-brand-cerulean font-semibold',
      'accent-secondary': 'text-brand-olive font-semibold',

      // Quote/Testimonial
      'quote': 'text-xl md:text-2xl italic font-light leading-relaxed text-foreground/95',
      'quote-sm': 'text-lg italic font-light leading-relaxed',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    color: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      accent: 'text-accent-foreground',
    },
  },
  defaultVariants: {
    variant: 'body',
    align: 'left',
    color: 'default',
  },
})

type TypographyVariant = NonNullable<VariantProps<typeof typographyVariants>['variant']>

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
  VariantProps<typeof typographyVariants> {
  as?: keyof React.JSX.IntrinsicElements
}

/**
 * Typography Component
 *
 * @example
 * <Typography variant="hero-title">Welcome</Typography>
 * <Typography variant="section-title" align="center">Featured Work</Typography>
 * <Typography variant="case-body">Project description...</Typography>
 */
const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, align, color, as, ...props }, ref) => {
    const element = as || getElementForVariant(variant)

    return React.createElement(
      element,
      {
        ref,
        className: cn(typographyVariants({ variant, align, color }), className),
        ...props,
      }
    )
  }
)
Typography.displayName = 'Typography'

/**
 * Helper function to determine semantic HTML element based on variant
 */
function getElementForVariant(variant?: TypographyVariant | null): string {
  if (!variant) return 'p'

  if (variant.includes('hero-title')) return 'h1'
  if (variant.includes('hero-subtitle')) return 'p'
  if (variant.includes('section-title')) return 'h2'
  if (variant.includes('subsection-title')) return 'h3'
  if (variant.includes('quote')) return 'blockquote'
  if (variant.includes('accent')) return 'span'
  if (variant.includes('label')) return 'label'
  if (variant.includes('metadata')) return 'span'
  if (variant.includes('caption')) return 'figcaption'

  return 'p'
}

// Export convenience components for common use cases

/**
 * H1 - Hero title
 */
const H1 = ({ className, ...props }: Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'>) => (
  <Typography
    as="h1"
    variant="hero-title"
    className={className}
    {...props}
  />
)
H1.displayName = 'H1'

/**
 * H2 - Section title
 */
const H2 = ({ className, ...props }: Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'>) => (
  <Typography
    as="h2"
    variant="section-title"
    className={className}
    {...props}
  />
)
H2.displayName = 'H2'

/**
 * H3 - Subsection title
 */
const H3 = ({ className, ...props }: Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'>) => (
  <Typography
    as="h3"
    variant="subsection-title"
    className={className}
    {...props}
  />
)
H3.displayName = 'H3'

/**
 * P - Body text
 */
const P = ({ className, ...props }: Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'>) => (
  <Typography
    as="p"
    variant="body"
    className={className}
    {...props}
  />
)
P.displayName = 'P'

/**
 * Caption - Small caption text
 */
const Caption = ({ className, ...props }: Omit<React.HTMLAttributes<HTMLElement>, 'color'>) => (
  <Typography
    as="figcaption"
    variant="caption"
    className={className}
    {...props}
  />
)
Caption.displayName = 'Caption'

/**
 * Quote - Blockquote element
 */
const Quote = ({ className, ...props }: Omit<React.HTMLAttributes<HTMLQuoteElement>, 'color'>) => (
  <Typography
    as="blockquote"
    variant="quote"
    className={cn('border-l-4 border-brand-cerulean pl-6 py-4', className)}
    {...props}
  />
)
Quote.displayName = 'Quote'

export {
  Typography,
  typographyVariants,
  H1,
  H2,
  H3,
  P,
  Caption,
  Quote,
}
