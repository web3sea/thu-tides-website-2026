/**
 * Animation constants for consistent motion design
 * Use these values throughout the application for unified timing
 */

// Duration constants (in seconds)
export const ANIMATION_DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.8,
  slower: 1.5,
} as const

// Duration constants for Tailwind classes (in milliseconds)
export const TAILWIND_DURATION = {
  fast: 'duration-300',
  normal: 'duration-500',
  slow: 'duration-700',
} as const

// Easing functions (Framer Motion compatible)
export const ANIMATION_EASING = {
  ease: [0.25, 0.1, 0.25, 1], // ease
  easeIn: [0.42, 0, 1, 1], // ease-in
  easeOut: [0, 0, 0.58, 1], // ease-out
  easeInOut: [0.42, 0, 0.58, 1], // ease-in-out
  spring: [0.34, 1.56, 0.64, 1], // spring effect
} as const

// Common Framer Motion variants
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const slideDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
}

export const slideLeft = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
}

export const slideRight = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
}

// Hover animation constants
export const HOVER_EFFECTS = {
  scale: { scale: 1.05 },
  scaleSmall: { scale: 1.02 },
  lift: { y: -2 },
  glow: { boxShadow: '0 0 20px rgba(11, 122, 161, 0.3)' },
} as const

// Tap animation constants
export const TAP_EFFECTS = {
  scale: { scale: 0.95 },
  scaleSmall: { scale: 0.98 },
} as const

// Flicker animation constants
export const FLICKER_ANIMATION = {
  duration: 0.8,
  ease: [0.34, 1.56, 0.64, 1], // Spring easing for energetic feel
} as const

/**
 * Standard transition configuration for Framer Motion
 */
export function createTransition(
  duration: keyof typeof ANIMATION_DURATION = 'normal',
  easing: keyof typeof ANIMATION_EASING = 'easeOut'
) {
  return {
    duration: ANIMATION_DURATION[duration],
    ease: ANIMATION_EASING[easing],
  }
}

/**
 * Stagger children animation
 */
export function createStagger(staggerDelay = 0.1) {
  return {
    animate: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }
}
