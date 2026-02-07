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
        "w-full border-t border-border bg-background text-foreground relative overflow-hidden",
        className
      )}
    >
      <div className="max-w-5xl mx-auto px-6 py-16 lg:py-20">
        {/* Logo - Centered */}
        <div className="flex justify-center mb-12">
          <Link href="/" className="text-foreground hover:opacity-80 transition-opacity">
            <Logo />
          </Link>
        </div>

        {/* Navigation Links - Centered Row */}
        <nav className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-16">
          {sections.map((section) => (
            <Link
              key={section.title}
              href={section.href || "#"}
              className="text-base md:text-lg font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              {section.title}
            </Link>
          ))}
        </nav>

        {/* Email Section - Centered */}
        {newsletterEnabled && (
          <div className="max-w-md mx-auto mb-12">
            <h3 className="text-sm font-medium text-muted-foreground mb-4 text-center">
              Stay Connected
            </h3>
            <form className="flex items-center gap-2">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} className="size-4" />
                </div>
                <input
                  className="w-full pl-9 pr-4 py-3 bg-muted/30 border border-border text-foreground placeholder-muted-foreground text-sm focus:ring-2 focus:ring-ring focus:border-ring transition-all rounded-md outline-none"
                  placeholder="your@email.com"
                  type="email"
                />
              </div>
              <button
                className="flex-shrink-0 bg-foreground hover:bg-foreground/90 text-background px-6 py-3 flex items-center justify-center rounded-md transition-all group font-medium"
                type="button"
              >
                <span className="mr-1">Send</span>
                <HugeiconsIcon
                  icon={ArrowUpRightIcon}
                  strokeWidth={2}
                  className="size-4 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                />
              </button>
            </form>
          </div>
        )}

        {/* Social Links - Centered */}
        <div className="flex justify-center items-center pt-8 border-t border-border">
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <HugeiconsIcon icon={social.icon} strokeWidth={2} className="size-6 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">{social.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
