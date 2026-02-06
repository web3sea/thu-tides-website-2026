# Visual Testing Checklist

Use this checklist when reviewing screenshots after running tests.

## Navigation Component

### Mobile (375px)
- [ ] Logo is visible and not cut off
- [ ] "Sign in" link is visible
- [ ] "Talk to us" button is visible and properly sized
- [ ] No horizontal scrollbar
- [ ] All elements fit within viewport width
- [ ] No text overflow or truncation
- [ ] Proper spacing between elements

### Tablet (768px)
- [ ] Desktop menu is visible (Product, Company)
- [ ] Logo is visible
- [ ] "Sign in" link is visible
- [ ] "Talk to us" button is visible
- [ ] Navigation layout is horizontal
- [ ] Proper spacing between menu items
- [ ] No overlap of elements

### Desktop (1440px)
- [ ] All desktop menu items visible
- [ ] Product dropdown appears on hover
- [ ] Dropdown is properly positioned
- [ ] Dropdown items are readable
- [ ] Logo and branding clear
- [ ] Navigation is properly aligned
- [ ] Consistent spacing

### Dropdown (Desktop/Tablet)
- [ ] Dropdown appears below Product button
- [ ] All 4 menu items visible:
  - [ ] Agent Canvas
  - [ ] Insights
  - [ ] Voice Experience
  - [ ] Browser Agent
- [ ] Item descriptions are readable
- [ ] Background has proper contrast
- [ ] Dropdown doesn't overflow screen

## GigaHero Component

### Mobile (375px)
- [ ] Background image loads
- [ ] Badge is visible and readable
- [ ] Title text is readable (not too small)
- [ ] Title wraps appropriately (no overflow)
- [ ] Subtitle is visible
- [ ] "Talk to us" CTA button is visible and well-sized
- [ ] Company logos are visible
- [ ] Logo text is readable
- [ ] No horizontal scrollbar
- [ ] Proper spacing between elements
- [ ] Text has good contrast with background

### Tablet (768px)
- [ ] Background image properly scaled
- [ ] Badge is prominent
- [ ] Title is larger than mobile
- [ ] Title line breaks are appropriate
- [ ] Subtitle is well-positioned
- [ ] CTA button is properly sized
- [ ] Company logos are well-spaced
- [ ] Overall layout is balanced
- [ ] Text is comfortably readable

### Desktop (1440px)
- [ ] Background image fills viewport
- [ ] Badge is positioned nicely
- [ ] Title is large and impactful
- [ ] Title has good line breaks
- [ ] Subtitle complements title
- [ ] CTA button is prominent
- [ ] Company logos are evenly distributed
- [ ] Overall composition is centered
- [ ] Generous spacing around elements
- [ ] Professional appearance

## Full Page

### Mobile
- [ ] Navigation doesn't overlap hero
- [ ] Content sections are readable
- [ ] All CTAs are visible above fold or easily accessible
- [ ] Consistent spacing between sections
- [ ] Footer is accessible
- [ ] No layout shifts

### Tablet
- [ ] Navigation to hero transition is smooth
- [ ] Content cards are properly sized
- [ ] Grid layouts work correctly
- [ ] Images scale appropriately
- [ ] Text is readable
- [ ] No awkward line breaks

### Desktop
- [ ] Wide layout utilizes space well
- [ ] Content is centered or properly aligned
- [ ] Maximum content width is reasonable
- [ ] No excessive whitespace
- [ ] Consistent alignment throughout
- [ ] Professional appearance

## Cross-Viewport Consistency

- [ ] Branding is consistent across all sizes
- [ ] Color scheme is maintained
- [ ] Typography hierarchy is clear
- [ ] Button styles are consistent
- [ ] Spacing ratios are proportional
- [ ] Animations don't break layout

## Accessibility Checks

- [ ] Text contrast meets WCAG standards
- [ ] Button hit areas are adequate (min 44x44px)
- [ ] Focus indicators are visible
- [ ] Text is readable at all sizes
- [ ] Interactive elements are clearly identifiable
- [ ] No text over busy background

## Common Issues to Look For

### Layout Problems
- [ ] Horizontal overflow/scrolling
- [ ] Vertical alignment issues
- [ ] Overlapping elements
- [ ] Cut-off text or images
- [ ] Inconsistent spacing

### Typography Issues
- [ ] Text too small to read
- [ ] Text too large (overwhelming)
- [ ] Poor line breaks (widows/orphans)
- [ ] Inconsistent font sizes
- [ ] Poor contrast with background

### Component Issues
- [ ] Buttons too small or too large
- [ ] Images not loading
- [ ] Icons misaligned
- [ ] Dropdown positioning incorrect
- [ ] Missing elements

### Responsive Issues
- [ ] Elements not scaling properly
- [ ] Breakpoint transitions are jarring
- [ ] Mobile menu not working
- [ ] Desktop features visible on mobile
- [ ] Touch targets too small

## Screenshot Comparison

### Before/After Changes
When comparing screenshots from different test runs:

1. **Layout Changes**
   - Are intentional changes visible?
   - Are unintentional changes present?
   - Is overall layout improved or degraded?

2. **Typography**
   - Font sizes appropriate for each viewport?
   - Line heights comfortable?
   - Letter spacing correct?

3. **Spacing**
   - Consistent margins and padding?
   - Proper use of whitespace?
   - Elements properly separated?

4. **Colors**
   - Consistent color usage?
   - Proper contrast maintained?
   - Brand colors applied correctly?

5. **Interactive Elements**
   - Buttons properly styled?
   - Hover states visible (in hover screenshots)?
   - Active states appropriate?

## Automated vs Manual Testing

### Automated Tests Verify
- Element presence
- Element visibility
- Clickability
- Text content
- Basic layout integrity

### Manual Screenshot Review Verifies
- Visual aesthetics
- Design quality
- Brand consistency
- User experience
- Subtle visual bugs

## Review Process

1. Run tests: `pnpm test:responsive`
2. Open screenshots directory: `/Users/brad/IDE/thu-tides-website/screenshots/`
3. Review each screenshot systematically using this checklist
4. Note any issues found
5. Create tickets for fixes
6. Re-run tests after fixes
7. Compare new screenshots with originals

## Approval Criteria

Screenshots are acceptable when:
- [ ] All checklist items pass
- [ ] No critical visual bugs
- [ ] Design matches requirements
- [ ] Responsive behavior is smooth
- [ ] Accessibility standards met
- [ ] Brand guidelines followed
- [ ] User experience is intuitive

## Notes Section

Use this space to document specific issues found during review:

```
Date: _____________
Reviewer: _____________

Issues Found:
1.
2.
3.

Action Items:
1.
2.
3.

Follow-up Date: _____________
```
