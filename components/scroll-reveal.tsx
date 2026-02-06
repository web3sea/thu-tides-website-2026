'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export type AnimationType = 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'zoomIn'

export interface ScrollRevealProps {
  children: React.ReactNode
  trigger?: AnimationType
  duration?: number
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
 * 
 * @example
 * <ScrollReveal trigger="slideUp" duration={0.8}>
 *   <h2>Animated heading</h2>
 * </ScrollReveal>
 */
export function ScrollReveal({
  children,
  trigger = 'slideUp',
  duration = 0.8,
  delay = 0,
  once = true,
  threshold = 0.1,
  className = '',
}: ScrollRevealProps) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: once,
    margin: '0px 0px -100px 0px',
  })

  const variants = animationVariants[trigger]

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * ScrollRevealStagger - Staggered animation for multiple children
 * 
 * @example
 * <ScrollRevealStagger>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </ScrollRevealStagger>
 */
export function ScrollRevealStagger({
  children,
  trigger = 'slideUp',
  duration = 0.8,
  staggerDelay = 0.1,
  once = true,
  threshold = 0.1,
  className = '',
}: ScrollRevealProps & { staggerDelay?: number }) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: once,
    margin: '0px 0px -100px 0px',
  })

  const variants = animationVariants[trigger]
  const childrenArray = React.Children.toArray(children)

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
          transition={{ duration, ease: 'easeOut' }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
