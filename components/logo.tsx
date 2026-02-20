'use client'

import * as React from 'react'
import { motion } from 'framer-motion'

export interface LogoProps {
  className?: string
  showText?: boolean
  iconClassName?: string
  textClassName?: string
}

export function Logo({
  className = '',
  showText = false,
  iconClassName = 'w-12 h-12',
  textClassName = 'text-2xl font-bold tracking-tight',
}: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.div
        className={iconClassName}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <svg
          viewBox="0 0 100 50"
          fill="none"
          className="w-full h-full"
          aria-label="Thu Tides Logo"
        >
          {/* Deep background wave */}
          <motion.path
            d="M 0 38 Q 15 30, 30 34 T 60 31 T 100 35 L 100 50 L 0 50 Z"
            fill="#A08B6A"
            opacity="0.25"
            animate={{ x: [0, 3, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Mid wave 1 */}
          <motion.path
            d="M 0 40 C 12 34, 22 37, 35 35 S 50 30, 62 33 S 80 38, 100 32 L 100 50 L 0 50 Z"
            fill="#C2A882"
            opacity="0.3"
            animate={{ x: [0, 4, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.15,
            }}
          />

          {/* Mid wave 2 */}
          <motion.path
            d="M 0 43 C 14 38, 28 42, 42 39 S 60 36, 72 39 S 88 43, 100 40 L 100 50 L 0 50 Z"
            fill="#C2A882"
            opacity="0.25"
            animate={{ x: [0, 3, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.3,
            }}
          />

          {/* Front wave */}
          <motion.path
            d="M 0 46 C 10 43, 22 45, 35 44 S 55 42, 68 44 S 85 46, 100 44 L 100 50 L 0 50 Z"
            fill="#D4C4A8"
            opacity="0.2"
            animate={{ x: [0, 2, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.45,
            }}
          />

          {/* Foam line */}
          <motion.path
            d="M 0 40 C 12 34, 22 37, 35 35 S 50 30, 62 33 S 80 38, 100 32"
            fill="none"
            stroke="#D4C4A8"
            strokeWidth="0.4"
            opacity="0.5"
            animate={{ x: [0, 4, 0], opacity: [0.5, 0.7, 0.5] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.15,
            }}
          />

          {/* THU text */}
          <text
            x="50"
            y="16"
            textAnchor="middle"
            fontFamily="'Didot', 'Playfair Display', 'Bodoni Moda', 'Georgia', serif"
            fontSize="14"
            fontWeight="400"
            letterSpacing="3"
            fill="#C2A882"
            opacity="0.95"
          >
            THU
          </text>

          {/* TIDES text */}
          <text
            x="50"
            y="29"
            textAnchor="middle"
            fontFamily="'Didot', 'Playfair Display', 'Bodoni Moda', 'Georgia', serif"
            fontSize="14"
            fontWeight="400"
            letterSpacing="3"
            fill="#C2A882"
            opacity="0.95"
          >
            TIDES
          </text>

          {/* Accent line between words */}
          <line
            x1="32"
            y1="18.5"
            x2="68"
            y2="18.5"
            stroke="#D4C4A8"
            strokeWidth="0.15"
            opacity="0.35"
          />
        </svg>
      </motion.div>
      {showText && <span className={textClassName}>Thu Tides</span>}
    </div>
  )
}
