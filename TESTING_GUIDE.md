# Puppeteer Responsive Testing Guide

## Quick Start

### 1. First Time Setup

All dependencies are already installed. To verify, run:

```bash
pnpm install
```

### 2. Start the Development Server

In one terminal:

```bash
pnpm dev
```

Wait for the message: `Ready on http://localhost:3000`

### 3. Run the Tests

In a second terminal:

```bash
pnpm test:responsive
```

Or use the all-in-one command:

```bash
pnpm test:dev
```

## What Gets Tested

### Navigation Component

#### All Breakpoints (Mobile: 375px, Tablet: 768px, Desktop: 1440px)
- Logo visibility and branding
- "Sign in" link presence and visibility
- "Talk to us" CTA button visibility and clickability
- Responsive layout transitions

#### Desktop Only (768px+)
- Desktop menu visibility (Product, Company dropdowns)
- Product dropdown hover functionality
- Menu items: Agent Canvas, Insights, Voice Experience, Browser Agent

### GigaHero Component

#### All Breakpoints
- Hero section rendering
- Title text: "AI that talks like a human. Handles millions of calls."
- Subtitle: "AI agents for enterprise support"
- Badge: "Giga Launches Browser Agent"
- CTA button visibility and clickability
- Company logos display (POSTMAN, DOORDASH, Rio, etc.)

#### Responsive Behavior
- Font size scaling:
  - Desktop (1440px): H1 ≥ 60px
  - Tablet (768px): H1 ≥ 50px
  - Mobile (375px): H1 ≥ 30px
- Proper text wrapping (no overflow)
- Aspect ratio consistency

### Page-Level Tests
- All CTAs visible and clickable across breakpoints
- No horizontal scroll
- No element overlap
- Smooth viewport transitions
- Visual regression screenshots

## Output

### Console Output

The tests will output detailed results showing:
- Which tests passed/failed
- Execution time for each test
- Screenshot locations

Example:
```
PASS  tests/responsive.test.ts
  Giga Components Responsive Tests
    Navigation Component
      at mobile viewport
        ✓ should render navigation at mobile (125ms)
        ✓ should show logo and branding at mobile (89ms)
        ✓ should show Sign in link at mobile (76ms)
        ✓ should show Talk to us CTA button at mobile (82ms)
```

### Screenshots

All screenshots are saved to `/Users/brad/IDE/thu-tides-website/screenshots/`:

**Navigation Screenshots:**
- `navigation-mobile.png`
- `navigation-tablet.png`
- `navigation-desktop.png`
- `navigation-dropdown-tablet.png`
- `navigation-dropdown-desktop.png`

**Hero Screenshots:**
- `hero-mobile.png`
- `hero-tablet.png`
- `hero-desktop.png`

**Full Page Screenshots:**
- `full-page-mobile.png`
- `full-page-tablet.png`
- `full-page-desktop.png`
- `above-fold-mobile.png`
- `above-fold-tablet.png`
- `above-fold-desktop.png`

### Visual Verification

After running tests:
1. Check the `screenshots/` directory
2. Open screenshots in an image viewer
3. Verify visual consistency across breakpoints
4. Compare with previous runs for regression testing

## Testing Workflow

### Making Component Changes

1. Make your changes to `components/navigation.tsx` or `components/giga-hero.tsx`
2. Start dev server: `pnpm dev`
3. View changes in browser: `http://localhost:3000/giga-demo`
4. Run tests: `pnpm test:responsive`
5. Review screenshots for visual regressions
6. Fix any failing tests
7. Commit changes with updated screenshots

### Adding New Tests

Edit `/Users/brad/IDE/thu-tides-website/tests/responsive.test.ts`:

```typescript
// Add to existing describe block
test('should verify new feature at ${viewport.name}', async () => {
  const element = await page.$('.your-selector');
  expect(element).not.toBeNull();

  const isVisible = await page.evaluate(() => {
    const el = document.querySelector('.your-selector');
    return el && el.offsetWidth > 0 && el.offsetHeight > 0;
  });

  expect(isVisible).toBe(true);
});
```

### Testing Different URLs

```bash
TEST_BASE_URL=http://localhost:3000 pnpm test:responsive
```

## Troubleshooting

### Test Failures

**"Navigation not found"**
- Ensure dev server is running on port 3000
- Check that `/giga-demo` page exists
- Verify Navigation component is imported in GigaLayout

**"Timeout waiting for element"**
- Check if animations are blocking element visibility
- Increase timeout in test or wait longer for animations
- Verify selectors match actual DOM structure

**"Screenshot directory error"**
- Ensure write permissions in project directory
- Check disk space

### Common Issues

**Port 3000 already in use:**
```bash
lsof -ti:3000 | xargs kill -9
pnpm dev
```

**Puppeteer won't launch:**
- On macOS: Usually works out of the box
- On Linux: Install chromium dependencies (see tests/README.md)
- Try: `pnpm install puppeteer --force`

**Tests pass but screenshots show issues:**
- Tests validate functionality, not pixel-perfect design
- Review screenshots manually
- Update test assertions if design changed intentionally

## Advanced Usage

### Debugging Tests

Add console logs:
```typescript
const debug = await page.evaluate(() => {
  const nav = document.querySelector('nav');
  console.log('Nav element:', nav);
  return nav ? nav.innerHTML : null;
});
console.log('Debug output:', debug);
```

Run with visible browser:
```typescript
// Edit tests/responsive.test.ts
browser = await puppeteer.launch({
  headless: false, // Show browser
  slowMo: 250,    // Slow down actions
});
```

### Custom Viewports

Add to VIEWPORTS object in test file:
```typescript
const VIEWPORTS = {
  mobile: { width: 375, height: 667, name: 'mobile' },
  tablet: { width: 768, height: 1024, name: 'tablet' },
  desktop: { width: 1440, height: 900, name: 'desktop' },
  ultrawide: { width: 2560, height: 1440, name: 'ultrawide' }, // New
};
```

### Performance Testing

Add to test file:
```typescript
test('should load page within acceptable time', async () => {
  const startTime = Date.now();
  await page.goto(`${BASE_URL}${TEST_PAGE}`);
  const loadTime = Date.now() - startTime;

  expect(loadTime).toBeLessThan(3000); // 3 seconds
});
```

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/test.yml`:

```yaml
name: Responsive UI Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Build application
        run: pnpm build

      - name: Start server
        run: pnpm start &

      - name: Wait for server
        run: npx wait-on http://localhost:3000 -t 30000

      - name: Run tests
        run: pnpm test:responsive

      - name: Upload screenshots
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: test-screenshots
          path: screenshots/
```

## Best Practices

1. **Run tests before committing** - Catch issues early
2. **Review screenshots** - Automated tests can't catch all visual issues
3. **Keep tests fast** - Use minimal waits, run serially
4. **Test user behavior** - Click, hover, scroll like a real user
5. **Use semantic selectors** - Prefer data-testid over classes
6. **Document failures** - Add comments explaining expected behavior
7. **Version screenshots** - Commit screenshots with code changes
8. **Test accessibility** - Verify ARIA labels, keyboard navigation

## Next Steps

1. Run the tests: `pnpm test:responsive`
2. Review the screenshots in `screenshots/`
3. Add more test cases as needed
4. Integrate into your CI/CD pipeline
5. Set up visual regression testing tools (Percy, Chromatic, etc.)

## Resources

- [Puppeteer Documentation](https://pptr.dev/)
- [Jest Documentation](https://jestjs.io/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
