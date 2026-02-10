"use client"

import * as React from "react"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Github01Icon,
  InstagramIcon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"

interface FooterLink {
  label: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
  href?: string
}

interface SocialLink {
  icon: typeof Github01Icon
  label: string
  href: string
  badge?: string
}

interface FooterProps {
  brandName?: string
  sections?: FooterSection[]
  socialLinks?: SocialLink[]
  className?: string
}

const defaultSections: FooterSection[] = [
  {
    title: "Expeditions",
    links: [],
    href: "/#partners",
  },
  {
    title: "Photographs",
    links: [],
    href: "/photography",
  },
  {
    title: "About",
    links: [],
    href: "/#about",
  },
]

const defaultSocialLinks: SocialLink[] = [
  { icon: InstagramIcon, label: "Instagram", href: "https://instagram.com/thu.tides" },
]

export function Footer({
  sections = defaultSections,
  socialLinks = defaultSocialLinks,
  className,
}: FooterProps) {
  return (
    <footer
      className={cn(
        "w-full relative overflow-hidden",
        className
      )}
    >
      {/* Decorative gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-cerulean/5 via-transparent to-brand-sage/5" />

      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-cerulean/30 to-transparent" />

      <div className="max-w-5xl mx-auto px-6 py-16 lg:py-24 relative">
        {/* Logo - Large centerpiece with creative water texture effect */}
        <div className="flex justify-center mb-20 relative">
          {/* Watermark texture behind logo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden">
            <div className="text-[20rem] font-black text-brand-cerulean/50 select-none scale-150">
              TT
            </div>
          </div>

          {/* Radial gradient splash effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[600px] h-[600px] bg-gradient-radial from-brand-cerulean/10 via-brand-cerulean/5 to-transparent rounded-full blur-3xl" />
          </div>

          {/* Subtle wave pattern overlay */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] animate-pulse" style={{ animationDuration: '8s' }} />

          <Link
            href="/"
            className="relative group z-10"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-cerulean/30 via-brand-cerulean-2/20 to-brand-sage/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full scale-[2]" />

            {/* Logo - Much larger scale */}
            <div className="relative text-foreground group-hover:text-brand-cerulean transition-colors duration-500 transform scale-[2.5] md:scale-[3]">
              <Logo />
            </div>
          </Link>
        </div>

        {/* Navigation Links - Centered Row with enhanced hover */}
        <nav className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-20">
          {sections.map((section) => (
            <Link
              key={section.title}
              href={section.href || "#"}
              className="text-base md:text-lg font-medium text-foreground/60 hover:text-brand-cerulean transition-all duration-300 relative group"
            >
              {section.title}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-brand-cerulean to-brand-cerulean-2 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* Social Links - Enhanced with brand accent */}
        <div className="flex justify-center items-center pt-12 border-t border-brand-cerulean/10 relative">
          {/* Decorative gradient on border */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-brand-cerulean/50 to-transparent" />

          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              className="flex items-center gap-3 px-4 py-2 rounded-full text-foreground/70 hover:text-brand-cerulean hover:bg-brand-cerulean/5 transition-all duration-300 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-brand-cerulean/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full scale-150" />
                <HugeiconsIcon
                  icon={social.icon}
                  strokeWidth={2}
                  className="size-6 relative group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-sm font-medium">{social.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-cerulean/5 via-transparent to-transparent pointer-events-none" />
    </footer>
  )
}
