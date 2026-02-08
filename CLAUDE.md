# Thu Tides Website - Project Instructions for Claude

## Business Context

**Thu Tides** is a creative collaboration service that connects boutique coastal hospitality brands with professional photography and video content creation. The business operates at the intersection of travel, art, and hospitality marketing.

- **Website:** https://thutides.com
- **Instagram:** https://instagram.com/thu.tides
- **Service areas:** Indonesia and the Philippines
- **Partnership models:** Barter and paid collaborations

### Target Audience

- Boutique hotels in coastal locations
- Homestays near beaches and waterways
- Dive resorts and diving operations
- Liveaboard vessels and boat-based hospitality

### What Thu Tides Provides

- Professional travel, underwater, and aerial photography
- Video content creation for hospitality brands
- Instagram promotion to an engaged audience of travelers
- Visual storytelling that captures the authentic character of each location

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.x |
| Language | TypeScript | 5.x |
| UI Library | React | 19.x |
| Styling | Tailwind CSS v4 | 4.x |
| Component Library | shadcn/ui (base-maia style) | via components.json |
| Icons | Hugeicons + Material Symbols Outlined | @hugeicons/react |
| Animation | Framer Motion | 12.x |
| Carousel | Embla Carousel | 8.x |
| Toast Notifications | Sonner | 2.x |
| Image Optimization | Sharp | 0.34.x |
| Package Manager | pnpm | - |
| Testing | Jest 30 + Puppeteer 24 | - |
| Browser Automation | agent-browser | via npx |
| Deployment | Vercel | Hobby plan |

### Key Libraries

- **class-variance-authority (cva):** Used for component variant definitions (see `components/typography.tsx`)
- **clsx + tailwind-merge:** Combined in `lib/utils.ts` as the `cn()` helper for conditional class merging
- **react-intersection-observer:** Scroll-triggered animations and lazy loading
- **next-themes:** Theme support (light/dark)
- **tw-animate-css:** Animation utilities for Tailwind

## Project Structure

```
app/
  layout.tsx          # Root layout with SEO metadata, Schema.org, analytics scripts
  page.tsx            # Homepage - single-page landing with all sections
  globals.css         # Tailwind v4 config, CSS variables, brand color tokens
  sitemap.ts          # Dynamic sitemap with auto-route discovery
  robots.ts           # Robots.txt configuration
  api/
    contact/route.ts  # Contact form API (Slack + Brevo integrations)
  components/
    GoogleAnalytics.tsx
    GoogleTag.tsx
  photography/page.tsx  # Photography gallery page
  giga-demo/page.tsx    # Demo/prototype page (excluded from sitemap)
  giga/page.tsx         # Demo/prototype page (excluded from sitemap)

components/
  navigation.tsx        # Main nav with desktop dropdown + mobile drawer
  giga-hero.tsx         # Hero section with background image + text hover effect
  giga-layout.tsx       # Page layout wrapper (nav + footer)
  services-section.tsx  # Services overview
  ocean-quote.tsx       # Decorative quote section
  portfolio-section.tsx # Portfolio gallery
  about-section.tsx     # About Thu Tides
  testimonials-section.tsx  # Partner testimonials
  video-loop-section.tsx    # Video background section
  collab-section.tsx    # Contact/collaboration form (posts to /api/contact)
  footer.tsx            # Site footer
  logo.tsx              # Thu Tides logo component
  animated-wave-logo.tsx # Animated logo variant
  typography.tsx        # Design system typography with cva variants
  scroll-reveal.tsx     # Scroll-triggered reveal animation wrapper
  ui/                   # shadcn/ui components (button, card, input, etc.)

lib/
  utils.ts              # cn() utility function
  animations.ts         # Framer Motion animation constants and helpers

product/                # Product documentation
  overview.md           # Product description, audience, features, brand positioning
  roadmap.md            # Landing page sections and implementation plan
  data-model.md         # Core entities, fields, relationships, and data flow

tests/
  smoke.test.ts         # Basic infrastructure validation with Puppeteer
  responsive.test.ts    # Responsive UI testing at mobile/tablet/desktop breakpoints

public/                 # Static assets (images, videos, logos, favicons)
```

## Active Integrations

### Google Analytics (GA4)

- **Measurement ID:** Stored in `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- **Component:** `app/components/GoogleAnalytics.tsx`
- Loaded in root layout for all pages

### Google Tag Manager

- **Tag ID:** Stored in `NEXT_PUBLIC_GOOGLE_TAG_ID`
- **Component:** `app/components/GoogleTag.tsx`
- Loaded in root layout for enhanced analytics tracking

### Slack Notifications

- **Webhook URL:** Stored in `SLACK_WEBHOOK_URL`
- Sends formatted Block Kit messages when contact form is submitted
- Fields: name, email, WhatsApp, inquiry message

### Brevo (formerly Sendinblue) - Email Marketing

- **API Key:** Stored in `BREVO_API_KEY`
- **Contact List ID:** Stored in `BREVO_LIST_ID`
- **Welcome Template ID:** Stored in `BREVO_WELCOME_TEMPLATE_ID` (optional)
- On form submission: creates/updates contact in Brevo list, optionally sends welcome email
- API endpoints: `https://api.brevo.com/v3/contacts` and `https://api.brevo.com/v3/smtp/email`

### Contact Form Flow

1. User fills out form in CollabSection (name, email, WhatsApp, inquiry)
2. Client-side validation, then POST to `/api/contact`
3. API route sends Slack notification (non-blocking)
4. API route adds contact to Brevo list + sends welcome email
5. Success/error toast displayed via Sonner

## Environment Variables

All environment variables are stored in `.env.local` (gitignored). Required variables:

```bash
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Tag Manager
NEXT_PUBLIC_GOOGLE_TAG_ID=GT-XXXXXXXX

# Slack - contact form notifications
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...

# Brevo - email marketing automation
BREVO_API_KEY=xkeysib-...
BREVO_LIST_ID=101
BREVO_WELCOME_TEMPLATE_ID=    # Optional; if empty, welcome email is skipped
```

Note: `NEXT_PUBLIC_` prefixed variables are exposed to the browser. Server-only secrets (Slack, Brevo) must NOT use this prefix.

## Deployment

- **Platform:** Vercel (Hobby plan)
- **Production URL:** https://thutides.com
- **Vercel Project:** thu-tides-website-2026
- **Team:** coraltriangle-uat
- **Auto-deploys:** Pushes to `main` branch trigger production deployments
- Environment variables must be configured in Vercel dashboard for production/preview

## Development Workflows

### Commands

```bash
pnpm dev              # Start dev server (localhost:3000) with Turbopack
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm test             # Run Jest tests
pnpm test:smoke       # Run smoke tests only
pnpm test:responsive  # Run responsive UI tests only
pnpm test:all         # Run all tests in tests/ directory
pnpm test:dev         # Start dev server + run responsive tests concurrently
```

### Testing Setup

#### Automated Testing (Jest + Puppeteer)

- **Framework:** Jest 30 with ts-jest
- **Browser Testing:** Puppeteer 24 (headless Chrome)
- **Config:** `jest.config.js` - runs serially (`maxWorkers: 1`) with 30s timeout
- **Test URL:** Defaults to `http://localhost:3000`, override with `TEST_BASE_URL` env var
- **Screenshots:** Saved to `screenshots/` directory (gitignored)
- Tests require the dev server to be running (`pnpm dev`) before execution
- The responsive tests target `/giga-demo` page specifically

#### Interactive Testing (agent-browser)

**agent-browser** is a browser automation CLI for AI agents that enables interactive testing and debugging of the website. It's particularly useful for:

- Testing form submissions and user interactions
- Debugging UI behavior in real-time
- Taking screenshots and inspecting elements
- Automating repetitive testing tasks
- Verifying responsive behavior across viewports

**Common Usage Patterns:**

```bash
# Launch browser in visible mode (headed) for watching automation
agent-browser --headed open http://localhost:3000

# Take snapshot to see interactive elements with refs
agent-browser --headed snapshot -i

# Fill and submit the contact form
agent-browser --headed fill @e1 "Test Name"
agent-browser --headed fill @e2 "test@example.com"
agent-browser --headed fill @e3 "+1234567890"
agent-browser --headed fill @e4 "Test inquiry message"
agent-browser --headed click @e5  # Submit button

# Take screenshot of results
agent-browser --headed screenshot screenshots/test-result.png

# Check console logs for errors
agent-browser --headed console

# Close browser when done
agent-browser close
```

**Key Features:**

- **Headed mode:** Use `--headed` flag to watch the browser in action (default is headless)
- **Element refs:** Snapshot with `-i` flag provides `@e1`, `@e2`, etc. refs for easy interaction
- **Session management:** Supports isolated sessions and persistent profiles
- **Debug tools:** Access console logs, network requests, and page errors
- **Screenshots & PDFs:** Capture visual state for documentation or debugging

**Installation:**

agent-browser is available via npx and installed as an agent skill:
```bash
npx skills add vercel-labs/agent-browser@agent-browser -g -y
```

**Testing the Contact Form:**

The contact form in `CollabSection` is a critical user interaction point. Use agent-browser to:
1. Navigate to `http://localhost:3000/#contact`
2. Fill out all required fields (name, email, WhatsApp, inquiry)
3. Submit and verify success/error handling
4. Check console logs for API errors
5. Verify toast notifications appear correctly

## Coding Standards and Patterns

### Path Aliases

- Use `@/` prefix for all imports (configured in `tsconfig.json`): `@/components/...`, `@/lib/...`

### Component Patterns

- **Client components:** Add `'use client'` directive at top of file when using hooks, event handlers, or browser APIs
- **Server components:** Default for pages and layouts (no directive needed)
- **shadcn/ui:** UI primitives live in `components/ui/`. Installed via shadcn CLI. Icon library is Hugeicons.
- **Typography:** Use the `Typography`, `H2`, `H3`, `P` components from `components/typography.tsx` for consistent text styling with cva variants
- **Animation:** Use constants from `lib/animations.ts` for consistent Framer Motion timings. Use `ScrollReveal` wrapper for scroll-triggered animations.
- **Glass effects:** Use `GlassCard` component for frosted-glass UI cards

### Styling Conventions

- Tailwind CSS v4 with CSS variables for theming (defined in `globals.css`)
- Brand color tokens available: `--brand-cerulean` and others
- Use `cn()` from `lib/utils.ts` for conditional class merging
- Mobile-first responsive design with `md:` and `lg:` breakpoints
- Dark mode support via CSS variables and `next-themes`

### SEO

- Comprehensive metadata in `app/layout.tsx` (OpenGraph, Twitter Cards, robots)
- Schema.org structured data (Organization + ProfessionalService) in root layout
- Dynamic sitemap with auto-route discovery at `app/sitemap.ts`
- Robots.txt at `app/robots.ts` (disallows `/api/` and `/giga-demo/`)

### Content Management

- Portfolio items, services, and testimonials are **static content managed in code** (no CMS or database)
- Contact inquiries are the only dynamic data, handled via API route + third-party integrations
- Images stored in `public/` directory, optimized with Sharp

## Product Documentation

The `product/` folder contains detailed product documentation:

- [Product Overview](./product/overview.md) -- Product description, target audience, problems solved, key features, and brand positioning
- [Product Roadmap](./product/roadmap.md) -- Landing page sections (Hero, Services, Portfolio, About, Collaboration) and implementation plan
- [Data Model](./product/data-model.md) -- Core entities (Portfolio Item, Service, Testimonial, Contact Inquiry), fields, relationships, and data flow

## Homepage Section Order

The landing page (`app/page.tsx`) renders sections in this order:

1. **GigaHero** -- Full-screen hero with aerial background image and "THU TIDES" text hover effect
2. **ServicesSection** -- Photography and video service offerings
3. **OceanQuote** -- Decorative quote/divider
4. **PortfolioSection** -- Gallery of previous work
5. **AboutSection** -- Story and team introduction
6. **TestimonialsSection** -- Partner testimonials with clickable property links
7. **VideoLoopSection** -- Background video showcase
8. **CollabSection** -- Contact form (id="contact") for collaboration inquiries

## Notes

- The `/giga-demo` and `/giga` routes are prototype/demo pages and are excluded from sitemap and robots
- The photography page (`/photography`) has category sections navigable via hash anchors (e.g., `#underwater`, `#aerials`)
- Navigation uses hash links (`#about`, `#contact`) for same-page scrolling on homepage
- The Vercel OIDC token in `.env.local` is auto-generated by Vercel CLI for local development
