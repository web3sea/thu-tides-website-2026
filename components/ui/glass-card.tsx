import * as React from 'react'
import { cn } from '@/lib/utils'

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Variant of the glass card
   * - default: Standard glass effect with subtle backdrop blur
   * - strong: More prominent glass effect with stronger blur
   * - minimal: Subtle effect with minimal blur
   */
  variant?: 'default' | 'strong' | 'minimal'
  /**
   * Whether to show hover effect
   */
  hover?: boolean
  /**
   * Custom padding size
   */
  padding?: 'sm' | 'md' | 'lg'
}

const variantStyles = {
  default: 'bg-white/5 backdrop-blur-sm border border-white/10',
  strong: 'bg-white/10 backdrop-blur-md border border-white/20',
  minimal: 'bg-white/[0.02] backdrop-blur-sm border border-white/5',
}

const paddingStyles = {
  sm: 'card-padding-sm',
  md: 'card-padding-md',
  lg: 'card-padding-lg',
}

/**
 * GlassCard - Reusable glass morphism card component
 * Perfect for dark backgrounds with overlay content
 *
 * @example
 * <GlassCard variant="default" hover padding="lg">
 *   <h3>Card Title</h3>
 *   <p>Card content</p>
 * </GlassCard>
 */
export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({
    className,
    variant = 'default',
    hover = true,
    padding = 'lg',
    children,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          variantStyles[variant],
          paddingStyles[padding],
          'rounded-2xl transition-fast',
          hover && 'hover:bg-white/10 hover:border-white/20',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

GlassCard.displayName = 'GlassCard'
