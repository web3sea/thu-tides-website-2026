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
    links: [
      { label: "Reconnect", href: "/reconnect" },
      { label: "Evolution", href: "/evolution" },
      { label: "Munduk Heaven", href: "/munduk-heaven" },
    ],
  },
  {
    title: "Photographs",
    links: [
      { label: "Aerials", href: "/aerials" },
      { label: "Underwater", href: "/underwater" },
      { label: "Top Side", href: "/topside" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Values", href: "/values" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
]

const defaultSocialLinks: SocialLink[] = [
  { icon: InstagramIcon, label: "Instagram", href: "#" },
  { icon: Github01Icon, label: "GitHub", href: "#" },
  { icon: NewTwitterIcon, label: "Twitter/X", href: "#" },
  { icon: YoutubeIcon, label: "YouTube", href: "#" },
  { icon: Linkedin01Icon, label: "LinkedIn", href: "#" },
]

export function Footer({
  brandName = "Letta",
  sections = defaultSections,
  socialLinks = defaultSocialLinks,
  newsletterEnabled = true,
  className,
}: FooterProps) {
  const [theme, setTheme] = React.useState<"light" | "dark">("light")

  React.useEffect(() => {
    // Check localStorage and system preference on mount
    const isDark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    setTheme(isDark ? "dark" : "light")
    document.documentElement.classList.toggle("dark", isDark)
  }, [])

  const toggleTheme = (newTheme: "light" | "dark") => {
    setTheme(newTheme)
    localStorage.theme = newTheme
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  return (
    <footer
      className={cn(
        "w-full border-t border-border bg-background text-foreground relative overflow-hidden",
        className
      )}
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        {/* Brand Logo */}
        <div className="mb-12">
          <Link href="/" className="w-fit block text-foreground hover:opacity-90 transition-opacity">
            <Logo />
          </Link>
        </div>

        {/* Footer Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Dynamic Sections */}
          {sections.map((section, idx) => (
            <div key={section.title} className={cn(
              idx === 0 && "lg:col-span-2",
              idx === 1 && "lg:col-span-3",
              idx === 2 && "lg:col-span-3"
            )}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {section.title === "Developers" && link.label === "GitHub" ? (
                      <Link
                        href={link.href}
                        className="text-sm hover:text-muted-foreground transition-colors flex items-center gap-2 group"
                      >
                        <span>{link.label}</span>
                        <div className="flex items-center bg-muted px-1.5 py-0.5 rounded text-[10px] font-medium text-muted-foreground group-hover:bg-muted/80 transition-colors">
                          <HugeiconsIcon icon={Github01Icon} className="size-2 mr-1" strokeWidth={2} />
                          20.6K
                        </div>
                      </Link>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm hover:text-muted-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Email Section */}
          {newsletterEnabled && (
            <div className="lg:col-span-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
                Drop us an email
              </h3>
              <form className="flex items-center gap-2 max-w-sm">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                    <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} className="size-4" />
                  </div>
                  <input
                    className="w-full pl-9 pr-4 py-2.5 bg-transparent border border-border text-foreground placeholder-muted-foreground text-sm focus:ring-1 focus:ring-ring focus:border-ring transition-all rounded-sm outline-none"
                    placeholder="your@email.com"
                    type="email"
                  />
                </div>
                <button
                  className="flex-shrink-0 bg-muted hover:bg-muted/80 text-foreground w-10 h-[42px] flex items-center justify-center rounded-sm transition-colors group"
                  type="button"
                >
                  <HugeiconsIcon
                    icon={ArrowUpRightIcon}
                    strokeWidth={2}
                    className="size-4 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                  />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Decorative Brand Banner */}
      <div className="w-full border-t border-b border-border overflow-hidden py-4 bg-background relative">
        <div className="whitespace-nowrap opacity-10 select-none">
          <span className="text-[80px] md:text-[120px] font-display font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground"
            style={{ WebkitTextStroke: "1px currentColor" }}
          >
            {brandName.toUpperCase()} FOLLOW {brandName.toUpperCase()} FOLLOW {brandName.toUpperCase()} FOLLOW {brandName.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Bottom Bar - Social Links and Theme Switcher */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Social Links */}
        <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-muted-foreground">
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <HugeiconsIcon icon={social.icon} strokeWidth={2} className="size-5" />
              <span className="hidden sm:inline">{social.label}</span>
            </Link>
          ))}
        </div>

        {/* Theme Switcher */}
        <div className="flex items-center border border-border rounded-sm overflow-hidden">
          <button
            onClick={() => toggleTheme("light")}
            className={cn(
              "px-3 py-1 text-xs font-medium transition-colors",
              theme === "light"
                ? "bg-background text-foreground"
                : "bg-transparent text-muted-foreground hover:bg-muted/50"
            )}
            aria-label="Switch to light theme"
          >
            Light
          </button>
          <button
            onClick={() => toggleTheme("dark")}
            className={cn(
              "px-3 py-1 text-xs font-medium transition-colors",
              theme === "dark"
                ? "bg-background text-foreground"
                : "bg-transparent text-muted-foreground hover:bg-muted/50"
            )}
            aria-label="Switch to dark theme"
          >
            Dark
          </button>
        </div>
      </div>
    </footer>
  )
}
