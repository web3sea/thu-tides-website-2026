'use client'

import * as React from 'react'

export function OceanQuote() {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <blockquote className="space-y-6">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative inline-block"
          >
            {/* Base text layer (gray) */}
            <p className="text-3xl md:text-4xl font-light text-gray-400 leading-relaxed">
              &ldquo;The ocean stirs the heart, inspires the imagination, and brings eternal joy to the soul.&rdquo;
            </p>

            {/* Highlighted text layer (follows mouse) */}
            <p
              className="absolute inset-0 text-3xl md:text-4xl font-light leading-relaxed pointer-events-none"
              style={{
                color: '#c4c7be',
                WebkitMaskImage: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
                maskImage: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
              }}
            >
              &ldquo;The ocean stirs the heart, inspires the imagination, and brings eternal joy to the soul.&rdquo;
            </p>
          </div>
          <footer className="text-lg text-gray-600 font-light">
            — Robert Wyland
          </footer>
        </blockquote>
      </div>
    </section>
  )
}
