'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ANIMATION_DURATION, ANIMATION_EASING } from '@/lib/animations'

export type AnimationType = 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'zoomIn'
export type AnimationSpeed = keyof typeof ANIMATION_DURATION

export interface ScrollRevealProps {
  children: React.ReactNode
  trigger?: AnimationType
  speed?: AnimationSpeed
  duration?: number // Deprecated: use speed instead
  delay?: number
  once?: boolean
  threshold?: number
  className?: string
}

const animationVariants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
}

/**
 * ScrollReveal - Triggers animations when element enters viewport
 * Now uses standardized animation constants from lib/animations
 *
 * @example
 * <ScrollReveal trigger="slideUp" speed="normal">
 *   <h2>Animated heading</h2>
 * </ScrollReveal>
 */
export function ScrollReveal({
  children,
  trigger = 'slideUp',
  speed = 'normal',
  duration, // Deprecated but kept for backwards compatibility
  delay = 0,
  once = true,
  threshold = 0.1,
  className = '',
}: ScrollRevealProps) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: once,
    rootMargin: '0px 0px -100px 0px',
  })

  const variants = animationVariants[trigger]

  // Use speed constant or fallback to legacy duration prop
  const animationDuration = duration ?? ANIMATION_DURATION[speed]

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration: animationDuration,
        delay,
        ease: ANIMATION_EASING.easeOut,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * ScrollRevealStagger - Staggered animation for multiple children
 * Now uses standardized animation constants from lib/animations
 *
 * @example
 * <ScrollRevealStagger speed="normal" staggerDelay={0.1}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </ScrollRevealStagger>
 */
export function ScrollRevealStagger({
  children,
  trigger = 'slideUp',
  speed = 'normal',
  duration, // Deprecated but kept for backwards compatibility
  staggerDelay = 0.1,
  once = true,
  threshold = 0.1,
  className = '',
}: ScrollRevealProps & { staggerDelay?: number }) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: once,
    rootMargin: '0px 0px -100px 0px',
  })

  const variants = animationVariants[trigger]
  const childrenArray = React.Children.toArray(children)

  // Use speed constant or fallback to legacy duration prop
  const animationDuration = duration ?? ANIMATION_DURATION[speed]

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0,
          },
        },
      }}
      className={className}
    >
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          variants={variants}
          transition={{
            duration: animationDuration,
            ease: ANIMATION_EASING.easeOut
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
