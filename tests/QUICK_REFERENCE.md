# Testing Quick Reference

## Commands

```bash
# Start development server (required for tests)
pnpm dev

# Run smoke test (quick validation)
pnpm test tests/smoke.test.ts

# Run full responsive test suite
pnpm test:responsive

# Run tests in watch mode (re-run on changes)
pnpm test:responsive:watch

# Run all tests
pnpm test

# Start dev server and run tests automatically
pnpm test:dev
```

## Manual Test Run (Step by Step)

```bash
# Terminal 1: Start dev server
cd /Users/brad/IDE/thu-tides-website
pnpm dev

# Terminal 2: Run tests (after server is ready)
cd /Users/brad/IDE/thu-tides-website
pnpm test:responsive
```

## Test Files

- `tests/smoke.test.ts` - Quick infrastructure validation
- `tests/responsive.test.ts` - Full responsive UI tests
- `tests/README.md` - Detailed documentation
- `TESTING_GUIDE.md` - Complete guide

## What Gets Tested

### Navigation Component (3 breakpoints)
- [x] Logo visibility
- [x] Sign in link
- [x] Talk to us CTA button
- [x] Desktop menu (768px+)
- [x] Product dropdown hover
- [x] Menu items

### GigaHero Component (3 breakpoints)
- [x] Hero rendering
- [x] Title text
- [x] Subtitle
- [x] Badge
- [x] CTA button
- [x] Company logos
- [x] Responsive font sizing
- [x] Text wrapping

### Page-level Tests
- [x] All CTAs accessible
- [x] No layout issues
- [x] Viewport transitions
- [x] Visual regression screenshots

## Breakpoints

| Name    | Width  | Height | Device       |
|---------|--------|--------|--------------|
| Mobile  | 375px  | 667px  | iPhone SE    |
| Tablet  | 768px  | 1024px | iPad         |
| Desktop | 1440px | 900px  | Laptop       |

## Screenshot Locations

All screenshots saved to: `/Users/brad/IDE/thu-tides-website/screenshots/`

Example files:
- `navigation-mobile.png`
- `navigation-tablet.png`
- `navigation-desktop.png`
- `hero-mobile.png`
- `full-page-desktop.png`

## Test URL

Default: `http://localhost:3000/giga-demo`

Override with:
```bash
TEST_BASE_URL=http://localhost:3001 pnpm test:responsive
```

## Exit Codes

- `0` - All tests passed
- `1` - One or more tests failed

## Common Issues

**Dev server not running:**
```bash
pnpm dev
```

**Port 3000 in use:**
```bash
lsof -ti:3000 | xargs kill -9
pnpm dev
```

**Tests timeout:**
- Wait for server to fully start
- Check network connection
- Increase timeout in jest.config.js

## Success Indicators

✓ All tests should show green checkmarks
✓ Screenshots generated in `/screenshots/`
✓ No console errors
✓ Test summary shows all passed

## Next Steps

1. Run smoke test first: `pnpm test tests/smoke.test.ts`
2. If smoke test passes, run full suite: `pnpm test:responsive`
3. Review screenshots for visual verification
4. Add to CI/CD pipeline (see TESTING_GUIDE.md)
