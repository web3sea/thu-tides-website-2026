'use client'

import * as React from 'react'
import { TextHoverEffect } from '@/components/ui/text-hover-effect'

export function OceanQuote() {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <blockquote className="space-y-8">
          <div className="w-full h-[200px] md:h-[300px]">
            <TextHoverEffect
              text="The ocean stirs the heart, inspires the imagination, and brings eternal joy to the soul."
              textSize="text-3xl md:text-4xl"
              viewBox="0 0 2400 200"
            />
          </div>
          <footer className="text-lg text-gray-600 font-light">
            — Robert Wyland
          </footer>
        </blockquote>
      </div>
    </section>
  )
}
