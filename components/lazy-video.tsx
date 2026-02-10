'use client'

import * as React from 'react'
import { useInView } from 'react-intersection-observer'

export interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  /**
   * Video source (MP4)
   */
  src: string

  /**
   * WebM alternative source (optional, for better compression)
   */
  srcWebm?: string

  /**
   * Poster image (shown before video loads)
   */
  poster?: string

  /**
   * Threshold for intersection observer (0-1)
   * @default 0.1
   */
  threshold?: number

  /**
   * Root margin for intersection observer
   * Positive values load video before it enters viewport
   * @default "200px 0px"
   */
  rootMargin?: string

  /**
   * Additional class names
   */
  className?: string
}

/**
 * LazyVideo - Loads video only when near viewport
 *
 * Features:
 * - Intersection Observer lazy loading
 * - WebM format support for better compression
 * - Poster image for instant visual feedback
 * - Progressive loading (faststart)
 *
 * @example
 * <LazyVideo
 *   src="/video.mp4"
 *   srcWebm="/video.webm"
 *   poster="/video-poster.webp"
 *   className="w-full h-full object-cover"
 *   autoPlay
 *   loop
 *   muted
 *   playsInline
 * />
 */
export function LazyVideo({
  src,
  srcWebm,
  poster,
  threshold = 0.1,
  rootMargin = '200px 0px',
  className = '',
  ...videoProps
}: LazyVideoProps) {
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: true, // Load video once when in view
  })

  const [shouldLoad, setShouldLoad] = React.useState(false)

  React.useEffect(() => {
    if (inView) {
      // Small delay to ensure smooth scrolling
      const timer = setTimeout(() => setShouldLoad(true), 100)
      return () => clearTimeout(timer)
    }
  }, [inView])

  return (
    <div ref={ref} className="relative w-full h-full">
      {shouldLoad ? (
        <video {...videoProps} poster={poster} className={className}>
          {/* Modern browsers prefer WebM (better compression) */}
          {srcWebm && <source src={srcWebm} type="video/webm" />}

          {/* Fallback to MP4 for Safari and older browsers */}
          <source src={src} type="video/mp4" />

          Your browser does not support the video tag.
        </video>
      ) : (
        // Show poster while video loads
        poster && <img src={poster} alt="" className={className} loading="lazy" />
      )}
    </div>
  )
}
