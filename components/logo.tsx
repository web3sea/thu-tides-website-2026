'use client'

import * as React from 'react'
import Image from 'next/image'
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
        <Image
          src="/thutides-logo_1.svg"
          alt="Thu Tides Logo"
          width={48}
          height={48}
          className="w-full h-full"
          priority
        />
      </motion.div>
      {showText && <span className={textClassName}>Thu Tides</span>}
    </div>
  )
}
