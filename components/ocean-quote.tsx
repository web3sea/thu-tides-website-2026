'use client'

import * as React from 'react'

export function OceanQuote() {
  return (
    <section className="relative section-padding bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <blockquote className="relative px-8 md:px-16 py-12 md:py-16">
          {/* Opening Quote Mark */}
          <div className="absolute top-0 left-0 text-blue-200/40 select-none pointer-events-none">
            <svg className="w-16 h-16 md:w-24 md:h-24" fill="currentColor" viewBox="0 0 32 32">
              <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8z" />
            </svg>
          </div>

          {/* Quote Text */}
          <p className="relative text-3xl md:text-4xl lg:text-5xl font-serif leading-relaxed md:leading-relaxed lg:leading-relaxed text-gray-800 text-center mb-0">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              The ocean stirs the heart,
            </span>
            {' '}
            <span className="text-gray-700">
              inspires the imagination,
            </span>
            {' '}
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              and brings eternal joy to the soul.
            </span>
          </p>

          {/* Closing Quote Mark */}
          <div className="absolute bottom-0 right-0 text-cyan-200/40 select-none pointer-events-none">
            <svg className="w-16 h-16 md:w-24 md:h-24 rotate-180" fill="currentColor" viewBox="0 0 32 32">
              <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8z" />
            </svg>
          </div>

          {/* Decorative Line */}
          <div className="flex items-center justify-center mt-8 md:mt-12">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
            <div className="mx-4 w-2 h-2 rounded-full bg-blue-400" />
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
          </div>
        </blockquote>
      </div>
    </section>
  )
}
