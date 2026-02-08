'use client'

import * as React from 'react'
import { motion } from 'framer-motion'

export interface AnimatedWaveLogoProps {
  className?: string
  showText?: boolean
  iconClassName?: string
  textClassName?: string
}

export function AnimatedWaveLogo({
  className = '',
  showText = true,
  iconClassName = 'w-8 h-8',
  textClassName = 'text-2xl font-bold tracking-tight',
}: AnimatedWaveLogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.div
        className={`${iconClassName} rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden`}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-white"
          aria-label="Thu Tides wave logo"
        >
          <motion.path
            d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
            animate={{ x: [0, 3, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.path
            d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
            animate={{ x: [0, 3, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.1,
            }}
          />
          <motion.path
            d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
            animate={{ x: [0, 3, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.2,
            }}
          />
        </svg>
      </motion.div>
      {showText && <span className={textClassName}>Thu Tides</span>}
    </div>
  )
}
