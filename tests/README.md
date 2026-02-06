# UI Responsive Testing

This directory contains Puppeteer-based tests for verifying the responsive behavior of the Giga components.

## Overview

The test suite validates:
- Navigation component responsiveness across mobile, tablet, and desktop viewports
- GigaHero component layout and text sizing at different breakpoints
- Dropdown menu interactions on desktop
- CTA button visibility and accessibility
- Proper text wrapping and layout
- Visual regression through automated screenshots

## Setup

All dependencies are already installed via the main package.json. No additional setup required.

## Running Tests

### Prerequisites

Start the development server before running tests:

```bash
pnpm dev
```

### Run Tests

```bash
# Run all tests
pnpm test

# Run only responsive tests
pnpm test:responsive

# Watch mode (re-run on file changes)
pnpm test:responsive:watch

# Start dev server and run tests automatically
pnpm test:dev
```

## Test Configuration

### Breakpoints Tested

- **Mobile**: 375x667 (iPhone SE)
- **Tablet**: 768x1024 (iPad)
- **Desktop**: 1440x900 (Standard laptop)

### Test URL

By default, tests run against `http://localhost:3000/giga-demo`. You can override this with the `TEST_BASE_URL` environment variable:

```bash
TEST_BASE_URL=http://localhost:3001 pnpm test:responsive
```

## Screenshots

All test runs generate screenshots in the `screenshots/` directory at the project root. These include:

- Navigation at each breakpoint
- Navigation with dropdown menu visible (desktop only)
- Hero section at each breakpoint
- Full page at each breakpoint
- Above-the-fold view at each breakpoint

## Test Structure

### Navigation Component Tests

- Logo and branding visibility
- Sign in link presence
- CTA button ("Talk to us") visibility and accessibility
- Desktop menu visibility (768px+)
- Product dropdown functionality (hover interaction)
- Menu item rendering

### GigaHero Component Tests

- Hero section rendering
- Title display and font sizing
- Subtitle display
- Badge visibility
- CTA button presence and clickability
- Company logo display
- Text sizing responsiveness
- Proper text wrapping
- Aspect ratio consistency

### Page-level Tests

- All CTAs accessible at all breakpoints
- No layout issues (overflow, overlap)
- Smooth transitions between breakpoints
- Visual regression screenshots

## Extending Tests

To add new tests:

1. Open `responsive.test.ts`
2. Add new test cases within existing `describe` blocks or create new ones
3. Use the existing viewport iteration pattern:
   ```typescript
   describe.each(Object.values(VIEWPORTS))('at $name viewport', (viewport) => {
     // Your test here
   });
   ```

## Troubleshooting

### Tests timing out

Increase the timeout in `jest.config.js`:
```javascript
testTimeout: 60000, // 60 seconds
```

### Dev server not ready

The `test:dev` script uses `wait-on` to ensure the server is ready. If it fails, ensure your dev server starts on `http://localhost:3000`.

### Screenshot issues

Screenshots are saved to `screenshots/` in the project root. If the directory doesn't exist, it will be created automatically. Ensure you have write permissions.

### Browser launch failures

If Puppeteer fails to launch Chrome, you may need to install additional dependencies:

**macOS:**
```bash
# Usually works out of the box
```

**Linux:**
```bash
sudo apt-get install -y \
  chromium-browser \
  libgbm1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libdrm2 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  xdg-utils
```

## CI/CD Integration

To run tests in CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Install dependencies
  run: pnpm install

- name: Build
  run: pnpm build

- name: Start server
  run: pnpm start &

- name: Wait for server
  run: npx wait-on http://localhost:3000

- name: Run tests
  run: pnpm test:responsive
```

## Best Practices

1. Always run tests against a consistent baseline (fresh build)
2. Review screenshots after major UI changes
3. Keep tests focused on user-visible behavior
4. Use semantic selectors (data attributes) when possible
5. Test accessibility alongside visual appearance
6. Don't rely on exact pixel values for responsive breakpoints
7. Test both landscape and portrait orientations for tablets
