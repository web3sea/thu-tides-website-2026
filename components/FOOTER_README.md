# Footer Component

A modern, customizable footer component with dark mode support, social links, and newsletter signup.

## Features

- ✅ **Fully typed with TypeScript**
- ✅ **Next.js Link integration** for optimized navigation
- ✅ **HugeIcons** for consistent icon usage
- ✅ **Built-in dark mode** with localStorage persistence
- ✅ **Responsive design** - Mobile, tablet, and desktop optimized
- ✅ **Customizable sections** - Pass your own links and sections
- ✅ **Accessible** - ARIA labels and semantic HTML

## Basic Usage

```tsx
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <div>
      {/* Your content */}
      <Footer />
    </div>
  )
}
```

## Props

### `FooterProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `brandName` | `string` | `"Letta"` | The brand name displayed in the logo and banner |
| `sections` | `FooterSection[]` | Default sections | Array of footer link sections |
| `socialLinks` | `SocialLink[]` | Default socials | Array of social media links |
| `newsletterEnabled` | `boolean` | `true` | Show/hide the newsletter signup form |
| `className` | `string` | `undefined` | Additional CSS classes for the footer |

### Type Definitions

```typescript
interface FooterSection {
  title: string
  links: FooterLink[]
}

interface FooterLink {
  label: string
  href: string
}

interface SocialLink {
  icon: typeof Github01Icon  // Any HugeIcon component
  label: string
  href: string
  badge?: string
}
```

## Custom Example

```tsx
import { Footer } from "@/components/footer"
import { Github01Icon, Discord01Icon } from "@hugeicons/core-free-icons"

export default function Page() {
  return (
    <Footer
      brandName="My Company"
      sections={[
        {
          title: "Product",
          links: [
            { label: "Features", href: "/features" },
            { label: "Pricing", href: "/pricing" },
            { label: "FAQ", href: "/faq" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "About", href: "/about" },
            { label: "Blog", href: "/blog" },
            { label: "Careers", href: "/careers" },
          ],
        },
      ]}
      socialLinks={[
        {
          icon: Github01Icon,
          label: "GitHub",
          href: "https://github.com/yourorg"
        },
        {
          icon: Discord01Icon,
          label: "Discord",
          href: "https://discord.gg/yourinvite"
        },
      ]}
      newsletterEnabled={true}
    />
  )
}
```

## Theme Toggle

The footer includes a built-in theme toggle that:
- Reads from `localStorage.theme`
- Falls back to system preference (`prefers-color-scheme`)
- Persists user choice across sessions
- Updates the `<html>` element's `dark` class

## Styling

The component uses your existing Tailwind theme tokens:
- `border-border` - Border colors
- `bg-background` - Background colors
- `text-foreground` - Text colors
- `text-muted-foreground` - Secondary text
- `bg-muted` - Muted backgrounds

You can customize these in your `tailwind.config.ts` or override with the `className` prop.

## Icons

Uses HugeIcons from `@hugeicons/core-free-icons`. Available social icons:
- `Github01Icon`
- `Discord01Icon`
- `NewTwitterIcon`
- `Youtube01Icon`
- `Linkedin01Icon`
- `Mail01Icon`
- And many more...

Browse all icons at: https://hugeicons.com/
