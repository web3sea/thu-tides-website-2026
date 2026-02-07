"use client"

import * as React from "react"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Github01Icon,
  DiscordIcon,
  NewTwitterIcon,
  YoutubeIcon,
  Linkedin01Icon,
  InstagramIcon,
  Mail01Icon,
  ArrowUpRightIcon,
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
  newsletterEnabled?: boolean
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
  brandName = "Letta",
  sections = defaultSections,
  socialLinks = defaultSocialLinks,
  newsletterEnabled = true,
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
        {/* Logo - Centered with brand-themed styling */}
        <div className="flex justify-center mb-16">
          <Link
            href="/"
            className="relative group"
          >
            <div className="absolute inset-0 bg-brand-cerulean/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full scale-150" />
            <div className="relative text-foreground group-hover:text-brand-cerulean transition-colors duration-500">
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

        {/* Email Section - Enhanced with brand colors */}
        {newsletterEnabled && (
          <div className="max-w-md mx-auto mb-16">
            <h3 className="text-sm font-medium text-brand-sage mb-6 text-center tracking-wide uppercase">
              Stay Connected
            </h3>
            <form className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-cerulean/60">
                  <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} className="size-5" />
                </div>
                <input
                  className="w-full pl-11 pr-4 py-3.5 bg-muted/20 border border-brand-cerulean/20 text-foreground placeholder-muted-foreground text-sm focus:ring-2 focus:ring-brand-cerulean/40 focus:border-brand-cerulean/40 hover:border-brand-cerulean/30 transition-all rounded-lg outline-none backdrop-blur-sm"
                  placeholder="your@email.com"
                  type="email"
                />
              </div>
              <button
                className="flex-shrink-0 bg-gradient-to-r from-brand-cerulean to-brand-cerulean-2 hover:from-brand-cerulean-2 hover:to-brand-cerulean text-white px-7 py-3.5 flex items-center justify-center rounded-lg transition-all duration-300 group font-medium shadow-lg shadow-brand-cerulean/20 hover:shadow-brand-cerulean/30 hover:scale-[1.02]"
                type="button"
              >
                <span className="mr-2">Send</span>
                <HugeiconsIcon
                  icon={ArrowUpRightIcon}
                  strokeWidth={2.5}
                  className="size-4 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300"
                />
              </button>
            </form>
          </div>
        )}

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
