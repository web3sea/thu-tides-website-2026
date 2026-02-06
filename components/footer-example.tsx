"use client"

import { Footer } from "./footer"
import {
  Github01Icon,
  DiscordIcon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons"

export function FooterExample() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Your main content */}
      <main className="flex-grow p-10 text-center text-muted-foreground">
        <p>Main content area...</p>
      </main>

      {/* Default footer - no props needed */}
      <Footer />

      {/* Or customize it */}
      {/*
      <Footer
        brandName="Your Brand"
        sections={[
          {
            title: "Product",
            links: [
              { label: "Features", href: "/features" },
              { label: "Pricing", href: "/pricing" },
            ],
          },
        ]}
        socialLinks={[
          { icon: Github01Icon, label: "GitHub", href: "https://github.com/..." },
          { icon: DiscordIcon, label: "Discord", href: "https://discord.gg/..." },
          { icon: NewTwitterIcon, label: "Twitter", href: "https://twitter.com/..." },
        ]}
        newsletterEnabled={true}
      />
      */}
    </div>
  )
}
