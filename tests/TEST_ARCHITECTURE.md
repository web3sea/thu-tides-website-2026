# Test Architecture

## Directory Structure

```
/Users/brad/IDE/thu-tides-website/
├── tests/
│   ├── responsive.test.ts       # Main test suite
│   ├── smoke.test.ts            # Quick validation
│   ├── README.md                # Test documentation
│   ├── QUICK_REFERENCE.md       # Command reference
│   ├── VISUAL_CHECKLIST.md      # Screenshot review
│   └── TEST_ARCHITECTURE.md     # This file
├── screenshots/                  # Auto-generated (gitignored)
│   ├── navigation-mobile.png
│   ├── navigation-tablet.png
│   ├── navigation-desktop.png
│   ├── hero-mobile.png
│   ├── hero-tablet.png
│   ├── hero-desktop.png
│   └── ... (14+ screenshots)
├── jest.config.js               # Jest configuration
├── run-tests.sh                 # Helper script
├── TESTING_GUIDE.md             # Complete guide
├── PUPPETEER_TESTING_SUMMARY.md # Implementation summary
└── package.json                 # Test scripts
```

## Test Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Test Execution Flow                     │
└─────────────────────────────────────────────────────────────┘

1. Start Dev Server
   └─> pnpm dev
       └─> Next.js starts on http://localhost:3000

2. Run Tests
   └─> pnpm test:responsive
       └─> Jest initializes
           └─> Puppeteer launches Chrome
               └─> For each viewport (mobile, tablet, desktop):
                   │
                   ├─> Navigation Tests
                   │   ├─> Render test + screenshot
                   │   ├─> Logo visibility test
                   │   ├─> Sign in link test
                   │   ├─> CTA button test
                   │   ├─> Desktop menu test (768px+)
                   │   ├─> Dropdown hover test (768px+)
                   │   └─> Menu items test (768px+)
                   │
                   ├─> GigaHero Tests
                   │   ├─> Render test + screenshot
                   │   ├─> Title test
                   │   ├─> Subtitle test
                   │   ├─> Badge test
                   │   ├─> CTA button test
                   │   ├─> Logos test
                   │   ├─> Font sizing test
                   │   ├─> Text wrapping test
                   │   └─> Clickability test
                   │
                   └─> Page-level Tests
                       ├─> All CTAs accessible
                       ├─> Layout integrity
                       └─> Visual regression screenshots

3. Generate Report
   └─> Jest outputs results
       └─> Screenshots saved to /screenshots/

4. Review
   └─> Manual screenshot review
       └─> Use VISUAL_CHECKLIST.md
```

## Component Test Coverage

```
┌──────────────────────────────────────────────────────────────┐
│                    Navigation Component                      │
└──────────────────────────────────────────────────────────────┘

Breakpoints: [Mobile: 375px] [Tablet: 768px] [Desktop: 1440px]

All Breakpoints:
├─ Logo visibility
├─ Sign in link
├─ Talk to us CTA
└─ Layout transitions

Desktop Only (768px+):
├─ Desktop menu
├─ Product dropdown
│   ├─ Hover interaction
│   ├─ Positioning
│   └─ Menu items:
│       ├─ Agent Canvas
│       ├─ Insights
│       ├─ Voice Experience
│       └─ Browser Agent
└─ Company dropdown

┌──────────────────────────────────────────────────────────────┐
│                     GigaHero Component                       │
└──────────────────────────────────────────────────────────────┘

Breakpoints: [Mobile: 375px] [Tablet: 768px] [Desktop: 1440px]

Visual Elements:
├─ Background image
├─ Badge: "Giga Launches Browser Agent"
├─ Title: "AI that talks like a human..."
├─ Subtitle: "AI agents for enterprise..."
├─ CTA button: "Talk to us"
└─ Company logos

Responsive Tests:
├─ Font size scaling
│   ├─ Desktop: ≥60px
│   ├─ Tablet: ≥50px
│   └─ Mobile: ≥30px
├─ Text wrapping
├─ Aspect ratio
└─ Layout integrity

┌──────────────────────────────────────────────────────────────┐
│                      Page-Level Tests                        │
└──────────────────────────────────────────────────────────────┘

├─ All CTAs accessible
├─ No horizontal scroll
├─ No element overlap
├─ Smooth transitions
└─ Visual regression
```

## Test Data Flow

```
┌─────────────┐
│  Test URL   │  http://localhost:3000/giga-demo
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  GigaLayout │  Renders Navigation + content
└──────┬──────┘
       │
       ├──────────────┬──────────────┐
       ▼              ▼              ▼
┌─────────┐    ┌──────────┐   ┌─────────┐
│   Nav   │    │ GigaHero │   │ Content │
└─────────┘    └──────────┘   └─────────┘
       │              │              │
       ▼              ▼              ▼
   [Tests]        [Tests]       [Tests]
       │              │              │
       └──────────┬───┴──────────────┘
                  ▼
            [Screenshots]
```

## Test Configuration

```
jest.config.js
├─ preset: 'ts-jest'
├─ testEnvironment: 'node'
├─ testMatch: ['**/tests/**/*.test.ts']
├─ moduleNameMapper: { '@/*': '<rootDir>/$1' }
├─ testTimeout: 30000
└─ maxWorkers: 1 (serial execution)

Puppeteer Config (in test file)
├─ headless: true
├─ args: ['--no-sandbox', '--disable-setuid-sandbox']
└─ timeout: 30000
```

## Viewport Matrix

```
┌──────────┬───────┬────────┬────────────┐
│ Viewport │ Width │ Height │   Device   │
├──────────┼───────┼────────┼────────────┤
│  Mobile  │ 375px │ 667px  │ iPhone SE  │
│  Tablet  │ 768px │ 1024px │    iPad    │
│ Desktop  │1440px │ 900px  │   Laptop   │
└──────────┴───────┴────────┴────────────┘

Test Execution Pattern:
FOR EACH viewport IN [mobile, tablet, desktop]:
    SET viewport dimensions
    WAIT for page load
    RUN component tests
    CAPTURE screenshots
END FOR
```

## Screenshot Naming Convention

```
Format: [component]-[viewport]-[state].png

Examples:
├─ navigation-mobile.png
├─ navigation-tablet.png
├─ navigation-desktop.png
├─ navigation-dropdown-desktop.png (with state)
├─ hero-mobile.png
├─ hero-tablet.png
├─ hero-desktop.png
├─ full-page-mobile.png
└─ above-fold-desktop.png

States:
├─ (default) - Normal state
├─ dropdown  - Hover state showing dropdown
└─ above-fold - Viewport capture only
```

## Test Lifecycle

```
┌─────────────────────────────────────────────────────────────┐
│                      Test Lifecycle                         │
└─────────────────────────────────────────────────────────────┘

beforeAll (once)
├─ Ensure screenshot directory exists
└─ Launch Puppeteer browser

beforeEach (per test suite)
├─ Create new page
└─ Navigate to test URL

Test Execution
├─ Set viewport
├─ Wait for page ready
├─ Execute test assertions
└─ Capture screenshots

afterEach (per test suite)
└─ Close page

afterAll (once)
└─ Close browser

┌─────────────────────────────────────────────────────────────┐
│                   Test Helper Functions                     │
└─────────────────────────────────────────────────────────────┘

ensureScreenshotDir()
├─ Check if directory exists
└─ Create if missing

waitForPageReady(page)
├─ Wait for network idle
└─ Wait for animations (1000ms)

evaluate() patterns
├─ Check element visibility
├─ Get computed styles
├─ Measure dimensions
└─ Verify content
```

## Dependencies Graph

```
package.json
│
├─ puppeteer (browser automation)
│   └─ Chrome/Chromium (headless browser)
│
├─ jest (test runner)
│   ├─ ts-jest (TypeScript support)
│   └─ @jest/globals (test utilities)
│
├─ ts-node (TypeScript execution)
│
├─ concurrently (parallel commands)
│   └─ Used in test:dev script
│
└─ wait-on (server ready detection)
    └─ Used in test:dev script
```

## Command Hierarchy

```
pnpm test
├─> Runs all Jest tests

pnpm test:smoke
├─> Runs smoke.test.ts
└─> Quick validation (~10s)

pnpm test:responsive
├─> Runs responsive.test.ts
└─> Full test suite (~2-3 min)

pnpm test:responsive:watch
├─> Runs in watch mode
└─> Re-runs on file changes

pnpm test:dev
├─> concurrently
    ├─> pnpm dev (Terminal 1)
    └─> wait-on + test:responsive (Terminal 2)

pnpm test:all
└─> Runs all tests in tests/
```

## Integration Points

```
┌─────────────────────────────────────────────────────────────┐
│                    Integration Points                       │
└─────────────────────────────────────────────────────────────┘

Next.js App
├─ /app/giga-demo/page.tsx
│   ├─ Uses GigaLayout
│   ├─ Renders GigaHero
│   └─ Test target page

Components
├─ /components/navigation.tsx
│   └─ Tested for responsive behavior
│
├─ /components/giga-hero.tsx
│   └─ Tested for responsive behavior
│
└─ /components/giga-layout.tsx
    └─ Wraps Navigation + content

Test System
├─ Jest (test runner)
├─ Puppeteer (browser control)
└─ TypeScript (type safety)

CI/CD (future)
├─ GitHub Actions
├─ Screenshot artifacts
└─ Test reports
```

## Test Execution Sequence

```
1. pnpm test:responsive
   ↓
2. Jest starts
   ↓
3. Load test file: responsive.test.ts
   ↓
4. beforeAll: Launch browser
   ↓
5. Describe: Navigation Component
   ↓
6. Loop: VIEWPORTS [mobile, tablet, desktop]
   ↓
7. beforeEach: New page, goto URL
   ↓
8. Test: should render navigation at {viewport}
   ├─ Set viewport dimensions
   ├─ Wait for page ready
   ├─ Find nav element
   ├─ Assert existence
   └─ Capture screenshot
   ↓
9. Test: should show logo at {viewport}
   ├─ Query logo element
   ├─ Evaluate visibility
   └─ Assert visible
   ↓
10. ... (more tests)
    ↓
11. afterEach: Close page
    ↓
12. Repeat steps 7-11 for GigaHero
    ↓
13. afterAll: Close browser
    ↓
14. Jest outputs results
    ↓
15. Screenshots in /screenshots/
```

## Success Criteria

```
✓ All tests passing
  ├─ ~65 tests total
  ├─ ~25 Navigation tests
  ├─ ~30 GigaHero tests
  └─ ~10 Page-level tests

✓ Screenshots generated
  ├─ 14+ PNG files
  └─ Saved to /screenshots/

✓ No errors in console
  ├─ No timeout errors
  ├─ No browser launch errors
  └─ No element not found errors

✓ Visual verification passed
  ├─ Manual review complete
  └─ VISUAL_CHECKLIST.md checked
```

## Extension Points

To add more tests:

```typescript
// 1. Add new viewport
const VIEWPORTS = {
  // ... existing
  ultrawide: { width: 2560, height: 1440, name: 'ultrawide' },
};

// 2. Add new component test
describe('NewComponent', () => {
  describe.each(Object.values(VIEWPORTS))('at $name viewport', (viewport) => {
    test('should do something', async () => {
      // Test logic
    });
  });
});

// 3. Add new test file
// Create: tests/new-feature.test.ts
// Add script: "test:new": "jest tests/new-feature.test.ts"
```

## Maintenance Schedule

```
Daily:
└─ Run tests before commits

Weekly:
├─ Review failing tests
└─ Update screenshots if needed

Monthly:
├─ Update dependencies
├─ Review test coverage
└─ Optimize slow tests

Quarterly:
├─ Audit test suite
├─ Remove obsolete tests
└─ Add new feature tests
```
