# Quick Review Checklist

Copy and paste this into your PR review comments:

```markdown
## Code Review - [PR Title]

### Review Summary
<!-- Brief overview of what was reviewed -->

### TypeScript ✅
- [ ] No `any` types
- [ ] Interfaces/types properly defined
- [ ] Imports organized
- [ ] Return types explicit

### React/Next.js ✅
- [ ] Server components by default
- [ ] `"use client"` only when needed
- [ ] Proper data fetching
- [ ] No unnecessary re-renders

### Styling ✅
- [ ] CVA for variants
- [ ] Theme colors (no hardcoded)
- [ ] Responsive design
- [ ] Dark mode support

### Accessibility ✅
- [ ] Semantic HTML
- [ ] ARIA labels
- [ ] Keyboard navigation
- [ ] Focus states visible
- [ ] Color contrast

### Performance ✅
- [ ] Next.js Image component
- [ ] Dynamic imports for heavy components
- [ ] Proper caching

### Security ✅
- [ ] Input validated
- [ ] No secrets
- [ ] XSS prevention

### Testing ✅
- [ ] Tests cover features
- [ ] Edge cases tested
- [ ] Tests readable

### Issues Found
<!-- List any issues using priority labels -->

🔴 [blocking] Issue 1
🟡 [important] Issue 2
🟢 [nit] Issue 3
💡 [suggestion] Suggestion 1

### What I Liked
<!-- Highlight good work -->

🎉 Thing 1
🎉 Thing 2

### Decision
- [ ] ✅ Approve
- [ ] 💬 Comment (suggestions only)
- [ ] 🔄 Request Changes (blocking issues)
```

---

## Priority Labels Reference

- 🔴 **[blocking]** - Must fix before merge
- 🟡 **[important]** - Should fix, discuss if disagree
- 🟢 **[nit]** - Nice to have, not blocking
- 💡 **[suggestion]** - Alternative approach
- 📚 **[learning]** - Educational, no action
- 🎉 **[praise]** - Good work!

---

## Common Issues Quick Reference

### TypeScript
```typescript
// ❌ Bad
function getData(data: any) { }

// ✅ Good
interface Data { value: string }
function getData(data: Data) { }
```

### Client/Server Components
```typescript
// ❌ Bad - unnecessary "use client"
"use client"
export default function Page() {
  return <div>Static content</div>
}

// ✅ Good - server component by default
export default function Page() {
  return <div>Static content</div>
}
```

### Styling
```typescript
// ❌ Bad - hardcoded colors
className="bg-blue-500"

// ✅ Good - theme colors
className="bg-primary"
```

### Images
```typescript
// ❌ Bad
<img src="/image.jpg" />

// ✅ Good
<Image src="/image.jpg" alt="Description" width={800} height={600} />
```

### Accessibility
```typescript
// ❌ Bad
<div onClick={handleClick}>Click me</div>

// ✅ Good
<button onClick={handleClick}>Click me</button>
```
