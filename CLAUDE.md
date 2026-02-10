# Thu Tides Website - Project Instructions for Claude

---

## 🚨 CRITICAL WORKFLOW REQUIREMENT 🚨

### EVERY PULL REQUEST CHECKLIST (NON-NEGOTIABLE)

Before merging ANY pull request to `main`, you MUST complete this checklist:

```
PR Merge Checklist:
☐ 1. Feature branch created and pushed
☐ 2. Pull request created on GitHub
☐ 3. 🔴 CODE REVIEW EXECUTED: /code-review-excellence ← DO THIS NOW
☐ 4. All 🔴 [blocking] issues resolved
☐ 5. All 🟡 [important] issues resolved
☐ 6. Tests passing: pnpm test:all
☐ 7. Build succeeds: pnpm build
☐ 8. Lint passes: pnpm lint
☐ 9. Frontend tested with agent-browser (if UI changes)
☐ 10. Ready to merge

⚠️ STEP 3 IS MANDATORY - DO NOT SKIP CODE REVIEW ⚠️
```

**Command to invoke code review:**
```
/code-review-excellence
```

**This is MANDATORY. No exceptions. See "Pull Request Workflow Requirements" section below.**

---

## 🚨 CRITICAL: DEPLOYMENT MONITORING (MANDATORY) 🚨

### AFTER EVERY MERGE TO MAIN - NO EXCEPTIONS

**When code is merged to `main`, Vercel automatically triggers a production deployment. You MUST:**

1. **IMMEDIATELY monitor the deployment** - Do NOT wait for user to ask
2. **Check deployment logs** - Verify build succeeded without errors
3. **Test production URL** - Verify site works correctly

### Pre-Deployment Checklist (BEFORE Merging to Main)

```bash
# 1. VERIFY LOCKFILE IS UP TO DATE
pnpm install  # Regenerate lockfile if package.json changed
git status    # Check if pnpm-lock.yaml was modified
git add pnpm-lock.yaml  # Stage lockfile if modified

# 2. VERIFY BUILD SUCCEEDS LOCALLY
pnpm build    # Must succeed without errors

# 3. VERIFY TESTS PASS
pnpm lint     # Must pass
pnpm test:all # Must pass (if tests exist)
```

**🚨 CRITICAL:** If you added/removed/updated dependencies in `package.json`, you MUST run `pnpm install` and commit the updated `pnpm-lock.yaml` BEFORE merging. An outdated lockfile will cause Vercel deployment to fail.

### Post-Deployment Monitoring (AFTER Merge)

```bash
# Step 1: Wait for deployment to trigger (15-20 seconds)
sleep 20

# Step 2: Check deployment status
vercel ls --scope coraltriangle-uat | head -8

# Step 3: Monitor until complete (Building → Ready or Error)
# Watch the "Status" column - wait for "Ready" or "Error"

# Step 4: If Status = "Error", GET LOGS IMMEDIATELY
vercel inspect <deployment-url> --logs --scope coraltriangle-uat

# Step 5: If Status = "Ready", VERIFY PRODUCTION
curl -I https://thutides.com  # Should return 200 OK
```

### Common Deployment Failures & Fixes

#### 1. ERR_PNPM_OUTDATED_LOCKFILE
**Cause:** `package.json` was modified but `pnpm-lock.yaml` wasn't updated
**Fix:**
```bash
pnpm install
git add pnpm-lock.yaml
git commit -m "Update pnpm lockfile"
git push
```

#### 2. Missing Environment Variables
**Cause:** Required env vars not set in Vercel dashboard
**Fix:** Go to Vercel Dashboard → Project Settings → Environment Variables → Add missing vars → Trigger redeploy

#### 3. TypeScript Errors
**Cause:** Type errors that passed locally but fail in strict mode
**Fix:** Run `pnpm build` locally to catch errors before pushing

### Deployment Rollback

If deployment fails and can't be fixed quickly:
1. Go to Vercel Dashboard → Deployments
2. Find the last successful deployment
3. Click "..." → "Promote to Production"
4. Fix issues in a new branch and re-deploy when ready

**⚠️ REMEMBER: Always monitor deployments immediately after merge. Never assume deployment succeeded.**

---

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

## Key Features

### Location Voting System

An interactive audience engagement feature that allows visitors to vote on the next destination for Thu Tides. This feature:

- **Interactive Dropdown UI:** Badge button in hero section opens animated dropdown with 11 travel destinations
- **Real-time Vote Tracking:** Firebase Firestore backend with live vote percentages
- **Privacy-First:** IP addresses are SHA-256 hashed for anonymous vote tracking
- **Rate Limiting:** 10 requests per minute per IP to prevent spam
- **Smooth Animations:** Framer Motion "liquid" spring physics for dropdown reveal
- **Mobile Responsive:** Touch-friendly UI that works across all devices

**Technical Implementation:**
- Frontend: `components/location-vote-dropdown.tsx` with GlassCard UI
- Backend: `/app/api/votes/location` (POST) and `/app/api/votes/results` (GET)
- Database: Firebase Firestore with atomic vote increments (prevents race conditions)
- Security: Firestore security rules prevent client-side writes; all votes validated server-side

**Locations:**
Maldives, Misool, Java, Lombok & Sumba, California, Flores, Kalimantan, Namibia, Mauritius, Banggai, Togean

See `IMPLEMENTATION_COMPLETE.md` and `FIREBASE_SETUP.md` for detailed documentation.

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
| Backend Services | Firebase (Firestore) | Client: 12.9.0, Admin: 13.6.1 |
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
    contact/route.ts         # Contact form API (Slack + Brevo integrations)
    votes/
      location/route.ts      # POST endpoint for vote submission with rate limiting
      results/route.ts       # GET endpoint for fetching poll results
  components/
    GoogleAnalytics.tsx
    GoogleTag.tsx
  photography/page.tsx  # Photography gallery page
  giga-demo/page.tsx    # Demo/prototype page (excluded from sitemap)
  giga/page.tsx         # Demo/prototype page (excluded from sitemap)

components/
  navigation.tsx             # Main nav with desktop dropdown + mobile drawer
  giga-hero.tsx              # Hero section with voting button + text hover effect
  location-vote-dropdown.tsx # Interactive voting dropdown with Firebase integration
  giga-layout.tsx            # Page layout wrapper (nav + footer)
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
  firebase.ts           # Firebase client SDK configuration
  firebase-admin.ts     # Firebase Admin SDK for server-side operations

types/
  votes.ts              # TypeScript interfaces for voting system

scripts/
  seed-firestore.js            # Seed Firestore with initial location data
  validate-firebase-config.js  # Validate Firebase environment variables
  firebase-setup-wizard.sh     # Interactive Firebase setup script

product/                # Product documentation
  overview.md           # Product description, audience, features, brand positioning
  roadmap.md            # Landing page sections and implementation plan
  data-model.md         # Core entities, fields, relationships, and data flow

tests/
  smoke.test.ts         # Basic infrastructure validation with Puppeteer
  responsive.test.ts    # Responsive UI testing at mobile/tablet/desktop breakpoints

test-voting-responsive.js  # Standalone voting system responsive tests (Puppeteer)
test-responsive-simple.js  # Simplified responsive test runner

docs/
  FIREBASE_SETUP.md              # Complete Firebase setup guide
  IMPLEMENTATION_COMPLETE.md     # Location voting system documentation
  VOTING_SYSTEM_TESTING.md       # Testing guide for voting feature
  RACE_CONDITION_FIX.md          # Technical notes on Firestore transaction fix
  QUICK_START.md                 # Quick start guide for developers

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

### Firebase Firestore - Location Voting System

- **Project:** thu-tides-voting
- **Database:** Firestore (NoSQL document database)
- **Client SDK:** `lib/firebase.ts` - browser-side voting UI
- **Admin SDK:** `lib/firebase-admin.ts` - server-side vote validation
- **Collections:**
  - `votes` - stores vote counts per location (11 documents)
  - `voter_ips` - tracks hashed IP addresses to prevent duplicate voting
- **Security:** SHA-256 IP hashing, Firestore security rules, rate limiting (10/min per IP)
- **API Endpoints:**
  - `GET /api/votes/results` - fetch current vote percentages (cached 60s)
  - `POST /api/votes/location` - submit vote with validation

See `FIREBASE_SETUP.md` for complete setup instructions and `IMPLEMENTATION_COMPLETE.md` for feature documentation.

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

# Firebase Client SDK (from Firebase Console → Project Settings)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=thu-tides-voting.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=thu-tides-voting
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=thu-tides-voting.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK (base64 encoded service account key)
FIREBASE_SERVICE_ACCOUNT_KEY=your_base64_encoded_key
```

Note: `NEXT_PUBLIC_` prefixed variables are exposed to the browser. Server-only secrets (Slack, Brevo, Firebase Admin) must NOT use this prefix.

## Deployment

- **Platform:** Vercel (Hobby plan)
- **Production URL:** https://thutides.com
- **Vercel Project:** thu-tides-website-2026
- **Team:** coraltriangle-uat
- **Auto-deploys:** Pushes to `main` branch trigger production deployments
- **⚠️ BEFORE MERGING TO MAIN:** MUST run `/code-review-excellence` on ALL PRs (see Pull Request Workflow Requirements)
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

# Firebase setup and utilities
node scripts/validate-firebase-config.js  # Validate Firebase env vars
node scripts/seed-firestore.js            # Seed Firestore with location data
bash scripts/firebase-setup-wizard.sh     # Interactive Firebase setup
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

## Pull Request Workflow Requirements

⚠️ **CRITICAL: READ THIS BEFORE CREATING ANY PULL REQUEST** ⚠️

### 🔴 MANDATORY: Code Review MUST Run BEFORE Merge

**EVERY SINGLE PULL REQUEST MUST BE REVIEWED USING THE `/code-review-excellence` SKILL.**

**This is NON-NEGOTIABLE. No exceptions. No shortcuts.**

---

### ✅ Standard PR Workflow (FOLLOW EXACTLY)

```
1. Create feature branch from `main`
   git checkout -b feature/your-feature-name

2. Implement changes with tests

3. Run automated tests locally
   pnpm lint
   pnpm build
   pnpm test:all

4. Push branch and create PR
   git push -u origin feature/your-feature-name
   gh pr create --title "..." --body "..."

5. 🔴 IMMEDIATELY INVOKE CODE REVIEW SKILL 🔴
   /code-review-excellence

   ⚠️ DO THIS AS SOON AS PR IS CREATED ⚠️
   ⚠️ DO NOT SKIP THIS STEP ⚠️
   ⚠️ DO NOT MERGE WITHOUT REVIEW ⚠️

6. Address ALL feedback from code review
   - Fix all 🔴 [blocking] issues
   - Fix all 🟡 [important] issues
   - Consider 💡 [suggestions]

7. Re-run tests after fixes
   pnpm test:all

8. Only merge after:
   ✅ Code review approved
   ✅ All tests passing
   ✅ All blocking issues resolved
```

---

### How to Invoke Code Review (MEMORIZE THIS)

**Command:**
```
/code-review-excellence
```

**Or with branch name:**
```bash
Skill tool with:
- skill: "code-review-excellence"
- args: "feature/your-branch-name"
```

**When to invoke:** IMMEDIATELY after creating the PR, BEFORE any merge consideration.

---

### What Code Review Checks

The `/code-review-excellence` skill provides comprehensive review:
- ✅ Code quality and maintainability
- ✅ Security vulnerabilities
- ✅ Performance issues
- ✅ Test coverage completeness
- ✅ Documentation quality
- ✅ Best practices adherence
- ✅ TypeScript type safety
- ✅ React patterns and hooks usage
- ✅ Accessibility compliance
- ✅ Error handling

---

### ⚠️ Consequences of Skipping Code Review

**DO NOT merge PRs without code review.** This leads to:
- ❌ Bugs slipping into production
- ❌ Security vulnerabilities
- ❌ Performance regressions
- ❌ Poor code quality accumulation
- ❌ Missing test coverage
- ❌ Technical debt buildup

**The code review skill exists to PREVENT these problems. USE IT EVERY TIME.**

### MANDATORY: Frontend Testing with agent-browser

**Every PR that includes frontend changes (components, pages, UI) MUST be tested interactively with agent-browser in headed mode.**

Required testing steps:
1. Start dev server: `pnpm dev`
2. Launch agent-browser in headed mode: `agent-browser --headed open http://localhost:3000`
3. Test all modified components/pages:
   - Take snapshot with `agent-browser --headed snapshot -i` to identify interactive elements
   - Test user interactions (clicks, form fills, navigation)
   - Verify responsive behavior at mobile/tablet/desktop viewports
   - Check console logs for errors: `agent-browser --headed console`
4. Take screenshots of key states: `agent-browser --headed screenshot screenshots/pr-[feature-name].png`
5. Document test results in PR description

**Critical test areas:**
- Contact form submission and validation (`#contact`)
- Location voting dropdown functionality (hero section badge button)
- Navigation menu (desktop dropdown + mobile drawer)
- Portfolio gallery interactions
- All links and anchor navigation

### Automated Test Requirements

Before creating a PR:
```bash
pnpm lint              # Must pass without errors
pnpm build             # Must build successfully
pnpm test:all          # All tests must pass
```

If adding new features:
- Add unit tests for new functions/utilities
- Add integration tests for API routes
- Add E2E tests for critical user flows

## Deployment Monitoring

### MANDATORY: Vercel Deployment Verification

**After every deployment to production (merge to main), deployment logs MUST be checked for errors.**

Process:
1. Monitor Vercel deployment in real-time during build
2. Check deployment logs in Vercel dashboard immediately after completion
3. Verify build succeeded without warnings
4. Test production URL: https://thutides.com
5. Check browser console on production for runtime errors
6. Verify all integrations working (analytics, Firebase, contact form)

**Vercel Dashboard Checks:**
- Build logs: No errors or warnings
- Function logs: No runtime errors in `/api/*` routes
- Analytics: Page views being tracked
- Performance: Core Web Vitals within targets

**Production Smoke Tests:**
```bash
# Use agent-browser to test production
agent-browser --headed open https://thutides.com

# Verify critical functionality
agent-browser --headed snapshot -i
agent-browser --headed console  # Check for errors

# Test voting system
# (Click badge button, verify dropdown loads with percentages)

# Test contact form
# (Navigate to #contact, fill form, submit - verify toast notification)
```

**Rollback Procedure:**
If deployment logs show errors or production tests fail:
1. Immediately revert to previous deployment in Vercel dashboard
2. Investigate error in deployment logs
3. Fix issue in feature branch
4. Re-test locally before re-deploying

### Environment Variable Changes

When adding/modifying environment variables:
1. Update `.env.local` locally
2. Update Vercel dashboard: Project Settings → Environment Variables
3. Set for all environments: Production, Preview, Development
4. Trigger redeploy after adding variables
5. Verify new variables in deployment logs

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
