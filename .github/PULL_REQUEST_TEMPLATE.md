## Description

<!-- Provide a brief summary of the changes in this PR -->

## Type of Change

<!-- Check all that apply -->

- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 🎨 Style update (formatting, renaming)
- [ ] ♻️ Refactoring (no functional changes)
- [ ] 🔧 Configuration change
- [ ] 📝 Documentation update
- [ ] ⚡ Performance improvement
- [ ] ✅ Test update

## Related Issue

<!-- Link to the issue this PR addresses -->

Fixes #(issue number)

## Changes Made

<!-- List the key changes made in this PR -->

-
-
-

## Screenshots/Videos

<!-- If applicable, add screenshots or videos to demonstrate the changes -->

## Testing

<!-- Describe the tests you ran and how to reproduce them -->

- [ ] Tested locally
- [ ] Tested on mobile/responsive
- [ ] Tested with keyboard navigation
- [ ] Tested with screen reader
- [ ] Added/updated unit tests
- [ ] Added/updated integration tests

### Test Instructions

1.
2.
3.

## Code Review Checklist

<!-- Reviewer: Use this checklist during review -->

### TypeScript
- [ ] No `any` types used
- [ ] Proper interfaces/types defined
- [ ] Imports organized correctly
- [ ] Return types explicit

### React/Next.js
- [ ] Server components by default
- [ ] `"use client"` only when necessary
- [ ] Proper data fetching patterns
- [ ] No unnecessary re-renders

### Styling
- [ ] CVA used for component variants
- [ ] Theme colors used (no hardcoded colors)
- [ ] Responsive design considered
- [ ] Dark mode considered
- [ ] `cn()` utility used for class merging

### Accessibility
- [ ] Semantic HTML used
- [ ] ARIA labels where needed
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Color contrast meets WCAG AA
- [ ] Alt text on images

### Performance
- [ ] Next.js `Image` component used (not `<img>`)
- [ ] Dynamic imports for heavy components
- [ ] No unnecessary bundle size increase
- [ ] Proper caching strategies

### Security
- [ ] User input validated
- [ ] No hardcoded secrets/API keys
- [ ] XSS prevention considered
- [ ] Proper authentication/authorization

### Testing
- [ ] Tests cover new features
- [ ] Edge cases tested
- [ ] Tests are readable and maintainable
- [ ] No flaky tests

### Documentation
- [ ] Code is self-documenting
- [ ] Complex logic has comments
- [ ] README updated if needed
- [ ] API changes documented

## Additional Notes

<!-- Any additional information reviewers should know -->

## Pre-merge Checklist

<!-- Verify before merging -->

- [ ] All CI checks pass
- [ ] Code has been reviewed and approved
- [ ] No merge conflicts
- [ ] Branch is up to date with main
- [ ] Tests pass locally
- [ ] Documentation updated

---

**Reviewer**: See [CODE_REVIEW.md](../CODE_REVIEW.md) for detailed review guidelines.
