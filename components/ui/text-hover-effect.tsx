"use client";
import React, { useRef, useEffect, useState, useId, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Wave polygon points in SVG userSpace coordinates (viewBox "0 0 800 200").
// The polygon always covers the bottom of the viewport (y=200); only the top
// edge oscillates to produce the water-wave fill effect.
// x: 0–800 spans full width. y: wave top oscillates ~92–130 (mid-text area).
const WAVE_POINTS_START = "0,92 136,90 272,100 448,122 552,124 688,120 800,102 800,200 0,200";
const WAVE_POINTS_MID   = "0,118 128,128 264,130 416,122 560,104 680,94 800,96 800,200 0,200";

export const TextHoverEffect = ({
  text,
  duration,
  textSize = "text-7xl",
  viewBox = "0 0 800 200",
  flickerTrigger,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  textSize?: string;
  viewBox?: string;
  flickerTrigger?: boolean;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const [flickerActive, setFlickerActive] = useState(false);

  // Unique IDs per instance – prevents SVG global-namespace collisions when
  // this component is rendered more than once on the same page.
  const uid = useId();
  const ids = useMemo(() => ({
    waveClip:       `waveClip-${uid}`,
    textGradient:   `textGradient-${uid}`,
    revealMask:     `revealMask-${uid}`,
    textMask:       `textMask-${uid}`,
    flickerGradient:`flickerGradient-${uid}`,
    flickerAnimX1:  `flickerAnimX1-${uid}`,
    flickerAnimX2:  `flickerAnimX2-${uid}`,
  }), [uid]);

  // Suppress looping animation for users who prefer reduced motion.
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  // Handle flicker trigger
  useEffect(() => {
    if (flickerTrigger && svgRef.current) {
      setFlickerActive(true);

      // SVGSVGElement.getElementById is scoped to this SVG fragment.
      const animX1 = svgRef.current.getElementById(ids.flickerAnimX1) as SVGAnimateElement;
      const animX2 = svgRef.current.getElementById(ids.flickerAnimX2) as SVGAnimateElement;

      if (animX1 && animX2) {
        animX1.beginElement();
        animX2.beginElement();
      }

      const timer = setTimeout(() => {
        setFlickerActive(false);
      }, 800); // Match animation duration

      return () => clearTimeout(timer);
    }
  }, [flickerTrigger, ids.flickerAnimX1, ids.flickerAnimX2]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none"
    >
      <defs>
        {/* Wave clip path – fills text from the bottom with an animated wave top edge.
            clipPathUnits="userSpaceOnUse" maps coordinates to the 800×200 viewport,
            which is reliable across all browsers (objectBoundingBox on <text> is not). */}
        <clipPath id={ids.waveClip} clipPathUnits="userSpaceOnUse">
          <polygon points={WAVE_POINTS_START}>
            {!prefersReducedMotion && (
              <animate
                attributeName="points"
                dur="4s"
                repeatCount="indefinite"
                values={`${WAVE_POINTS_START}; ${WAVE_POINTS_MID}; ${WAVE_POINTS_START}`}
                calcMode="spline"
                keySplines="0.45 0.05 0.55 0.95; 0.45 0.05 0.55 0.95"
                keyTimes="0;0.5;1"
              />
            )}
          </polygon>
        </clipPath>

        <linearGradient
          id={ids.textGradient}
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id={ids.revealMask}
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id={ids.textMask}>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill={`url(#${ids.revealMask})`}
          />
        </mask>

        {/* Flicker gradient - left-to-right sweep */}
        <linearGradient
          id={ids.flickerGradient}
          x1="-50%"
          x2="0%"
          y1="0%"
          y2="0%"
        >
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="50%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
          <animate
            attributeName="x1"
            from="-50%"
            to="150%"
            dur="0.8s"
            begin="indefinite"
            fill="freeze"
            id={ids.flickerAnimX1}
          />
          <animate
            attributeName="x2"
            from="0%"
            to="200%"
            dur="0.8s"
            begin="indefinite"
            fill="freeze"
            id={ids.flickerAnimX2}
          />
        </linearGradient>
      </defs>

      {/* Base outline text – letter strokes always visible above the wave */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="1"
        className={`fill-transparent stroke-white font-[helvetica] ${textSize} font-bold`}
        style={{ opacity: hovered ? 0.5 : 0.9 }}
      >
        {text}
      </text>

      {/* Wave-fill text – white fill clipped by the animated wave polygon.
          Stays at 0.75 opacity on hover so the wave remains visible behind
          the gradient reveal effect. */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className={`fill-white font-[helvetica] ${textSize} font-bold`}
        clipPath={`url(#${ids.waveClip})`}
        style={{ opacity: hovered ? 0.75 : 1 }}
      >
        {text}
      </text>

      {/* Animated stroke outline */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.5"
        className={`fill-transparent stroke-white font-[helvetica] ${textSize} font-bold`}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
        style={{ opacity: 0.5 }}
      >
        {text}
      </motion.text>

      {/* Gradient effect on hover */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke={`url(#${ids.textGradient})`}
        strokeWidth="0.8"
        mask={`url(#${ids.textMask})`}
        className={`fill-white/80 font-[helvetica] ${textSize} font-bold`}
        style={{ opacity: hovered ? 1 : 0 }}
      >
        {text}
      </text>

      {/* Flicker effect layer - appears during click animation */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={`url(#${ids.flickerGradient})`}
        className={`font-[helvetica] ${textSize} font-bold`}
        style={{
          opacity: flickerActive ? 1 : 0,
          filter: "drop-shadow(0 0 20px rgba(255,255,255,0.8))",
          transition: "opacity 0.1s"
        }}
      >
        {text}
      </text>
    </svg>
  );
};
