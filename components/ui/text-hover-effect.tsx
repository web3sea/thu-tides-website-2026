"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const WAVE_POINTS_START = "0,0.46 0.17,0.45 0.34,0.50 0.56,0.61 0.69,0.62 0.86,0.60 1,0.51 1,1 0,1";
const WAVE_POINTS_MID   = "0,0.59 0.16,0.64 0.33,0.65 0.52,0.61 0.70,0.52 0.85,0.47 1,0.48 1,1 0,1";

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

      // Trigger SVG animations
      const animX1 = svgRef.current.querySelector('#flickerAnimX1') as SVGAnimateElement;
      const animX2 = svgRef.current.querySelector('#flickerAnimX2') as SVGAnimateElement;

      if (animX1 && animX2) {
        animX1.beginElement();
        animX2.beginElement();
      }

      const timer = setTimeout(() => {
        setFlickerActive(false);
      }, 800); // Match animation duration

      return () => clearTimeout(timer);
    }
  }, [flickerTrigger]);

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
        {/* Wave clip path – fills the text from the bottom with an animated wave top edge */}
        <clipPath id="waveClip" clipPathUnits="objectBoundingBox">
          <polygon points={WAVE_POINTS_START}>
            <animate
              attributeName="points"
              dur="4s"
              repeatCount="indefinite"
              values={`${WAVE_POINTS_START}; ${WAVE_POINTS_MID}; ${WAVE_POINTS_START}`}
              calcMode="spline"
              keySplines="0.45 0.05 0.55 0.95; 0.45 0.05 0.55 0.95"
              keyTimes="0;0.5;1"
            />
          </polygon>
        </clipPath>

        <linearGradient
          id="textGradient"
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
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}

          // example for a smoother animation below

          //   transition={{
          //     type: "spring",
          //     stiffness: 300,
          //     damping: 50,
          //   }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>

        {/* Flicker gradient - left-to-right sweep */}
        <linearGradient
          id="flickerGradient"
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
            id="flickerAnimX1"
          />
          <animate
            attributeName="x2"
            from="0%"
            to="200%"
            dur="0.8s"
            begin="indefinite"
            fill="freeze"
            id="flickerAnimX2"
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

      {/* Wave-fill text – white fill clipped by the animated wave polygon */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className={`fill-white font-[helvetica] ${textSize} font-bold`}
        clipPath="url(#waveClip)"
        style={{ opacity: hovered ? 0.3 : 1 }}
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
        stroke="url(#textGradient)"
        strokeWidth="0.8"
        mask="url(#textMask)"
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
        fill="url(#flickerGradient)"
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
