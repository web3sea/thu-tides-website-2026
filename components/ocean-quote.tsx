'use client'

import * as React from 'react'

export function OceanQuote() {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <blockquote className="space-y-6">
          <p className="text-3xl md:text-4xl font-light text-gray-800 leading-relaxed">
            &ldquo;The ocean stirs the heart, inspires the imagination, and brings eternal joy to the soul.&rdquo;
          </p>
          <footer className="text-lg text-gray-600 font-light">
            — Robert Wyland
          </footer>
        </blockquote>
      </div>
    </section>
  )
}
