# Code Review Standards - Thu Tides Website

## Project Stack
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 + ShadCN UI
- **Component Library**: Base UI React + ShadCN
- **Icons**: Hugeicons

## Code Review Goals

1. ✅ Maintain code quality and consistency
2. 🐛 Catch bugs and edge cases early
3. 🔒 Ensure security best practices
4. 📚 Share knowledge across the team
5. ⚡ Optimize performance where it matters
6. ♿ Ensure accessibility standards

## Review Process

### For Reviewers

**Time commitment**: 15-30 minutes per PR

#### Phase 1: Context (2-3 min)
- [ ] Read PR description and understand the goal
- [ ] Check if PR is appropriately sized (<400 lines preferred)
- [ ] Verify all CI checks pass
- [ ] Check linked issues/tickets

#### Phase 2: High-Level Review (5-10 min)
- [ ] Architecture fits the problem
- [ ] Consistent with existing patterns
- [ ] No unnecessary complexity
- [ ] Proper file organization

#### Phase 3: Detailed Review (10-15 min)
- [ ] Review each file using checklists below
- [ ] Test coverage is adequate
- [ ] Edge cases handled
- [ ] Accessibility considered

#### Phase 4: Feedback (2-5 min)
- [ ] Prioritize feedback (blocking vs. suggestions)
- [ ] Provide specific, actionable comments
- [ ] Highlight what was done well
- [ ] Make clear approve/request changes decision

---

## Review Checklists

### 1. TypeScript Standards

#### ✅ Type Safety
```typescript
// ❌ Avoid any - defeats type safety
function processData(data: any) {
  return data.value;
}

// ✅ Use proper types or unknown
interface DataPayload {
  value: string;
}
function processData(data: DataPayload) {
  return data.value;
}

// ✅ Or use unknown for truly unknown data
function processData(data: unknown) {
  if (isDataPayload(data)) {
    return data.value;
  }
  throw new Error('Invalid data');
}
```

**Check for:**
- [ ] No `any` types (use `unknown` if truly unknown)
- [ ] Interfaces defined for props and data structures
- [ ] Return types explicitly declared for functions
- [ ] Proper use of union types vs optional properties
- [ ] Type guards used when narrowing types

#### ✅ Import Organization
```typescript
// ✅ Proper import order
// 1. React/Next.js
import { Metadata } from "next"
import { use } from "react"

// 2. External libraries
import { cva, type VariantProps } from "class-variance-authority"

// 3. Internal utilities
import { cn } from "@/lib/utils"

// 4. Components
import { Button } from "@/components/ui/button"

// 5. Types (if not inline)
import type { UserProfile } from "@/types"
```

**Check for:**
- [ ] Imports grouped logically (framework → external → internal → components)
- [ ] Type imports use `type` keyword
- [ ] Path aliases (`@/*`) used consistently
- [ ] No unused imports

---

### 2. React/Next.js Best Practices

#### ✅ Component Structure
```typescript
// ✅ Good component structure
"use client" // Only when needed

import type { ComponentProps } from "react"

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "default" | "outline"
  size?: "sm" | "md" | "lg"
}

export function Button({
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  )
}
```

**Check for:**
- [ ] `"use client"` directive only when necessary (interactivity, hooks)
- [ ] Server components by default (no `"use client"` unless needed)
- [ ] Props interfaces well-defined with types
- [ ] Default values provided where sensible
- [ ] Proper spreading of props (`...props`)

#### ✅ Server vs Client Components
```typescript
// ✅ Server component (default) - no "use client"
// app/page.tsx
import { getUser } from "@/lib/api"

export default async function Page() {
  const user = await getUser() // Can use async/await
  return <UserProfile user={user} />
}

// ✅ Client component - interactive
// components/button.tsx
"use client"

import { useState } from "react"

export function Counter() {
  const [count, setCount] = useState(0) // Uses hooks
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

**Check for:**
- [ ] Server components used by default
- [ ] Client components only when needed (hooks, events, browser APIs)
- [ ] No unnecessary `"use client"` directives
- [ ] Async/await in server components only
- [ ] No useState/useEffect in server components

#### ✅ Data Fetching
```typescript
// ✅ Server component data fetching
async function Page() {
  // Direct fetch in server component
  const data = await fetch('https://api.example.com/data', {
    cache: 'force-cache', // or 'no-store' for dynamic
  })

  return <div>{data}</div>
}

// ❌ Avoid - don't use useEffect for initial data
"use client"
function Page() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api/data').then(res => setData(res)) // Avoid this pattern
  }, [])
}
```

**Check for:**
- [ ] Data fetching in server components when possible
- [ ] Proper cache strategies (`force-cache`, `no-store`)
- [ ] Loading states handled (loading.tsx, Suspense)
- [ ] Error boundaries for error handling
- [ ] No unnecessary client-side fetching

---

### 3. Tailwind CSS & Styling

#### ✅ Styling Patterns
```typescript
// ✅ Use CVA for component variants
const buttonVariants = cva(
  "rounded-4xl border transition-all", // base styles
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline: "border-border bg-input/30",
      },
      size: {
        default: "h-9 px-3",
        sm: "h-8 px-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// ✅ Use cn() utility for merging classes
<Button className={cn("custom-class", conditionalClass && "extra")} />
```

**Check for:**
- [ ] CVA used for component variants (not manual string concatenation)
- [ ] `cn()` utility used for class merging
- [ ] Tailwind classes used (no inline styles)
- [ ] Consistent spacing scale (0.5, 1, 1.5, 2, 3, 4, etc.)
- [ ] Color variables used (not hardcoded colors)
- [ ] Responsive design considered (sm:, md:, lg: prefixes)

#### ✅ Color & Theme Usage
```typescript
// ✅ Use theme colors
className="bg-primary text-primary-foreground"
className="bg-secondary text-secondary-foreground"
className="bg-destructive text-destructive-foreground"
className="border-border bg-muted"

// ❌ Avoid hardcoded colors
className="bg-blue-500 text-white"
className="bg-red-600"
```

**Check for:**
- [ ] Theme colors used (`primary`, `secondary`, `muted`, etc.)
- [ ] Dark mode considered (uses theme variables)
- [ ] No hardcoded colors (blue-500, red-600, etc.)
- [ ] Proper contrast ratios for accessibility

---

### 4. Accessibility

```typescript
// ✅ Semantic HTML and ARIA
<button
  type="button"
  aria-label="Close dialog"
  aria-expanded={isOpen}
>
  Close
</button>

// ✅ Proper form labels
<label htmlFor="email">Email</label>
<input id="email" type="email" required />

// ✅ Keyboard navigation
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  onClick={handleClick}
>
  Click me
</div>
```

**Check for:**
- [ ] Semantic HTML elements (`<button>`, `<nav>`, `<main>`, etc.)
- [ ] Proper ARIA labels where needed
- [ ] Form inputs have associated labels
- [ ] Keyboard navigation works (tab, enter, space)
- [ ] Focus states visible (`focus-visible:` classes)
- [ ] Alt text on images
- [ ] Color contrast meets WCAG AA standards

---

### 5. Performance

#### ✅ Image Optimization
```typescript
// ✅ Use Next.js Image component
import Image from "next/image"

<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority // for above-the-fold images
/>

// ❌ Avoid regular img tags
<img src="/hero.jpg" alt="Hero" />
```

**Check for:**
- [ ] Next.js `Image` component used (not `<img>`)
- [ ] Images have proper alt text
- [ ] Width and height specified
- [ ] `priority` prop for above-the-fold images
- [ ] Lazy loading for below-the-fold images

#### ✅ Bundle Size
```typescript
// ✅ Dynamic imports for large components
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('@/components/heavy'), {
  loading: () => <Skeleton />,
})

// ✅ Tree-shakeable imports
import { Button } from "@/components/ui/button" // ✅ Specific import

// ❌ Avoid barrel imports of large libraries
import * as HugeIcons from "@hugeicons/react" // ❌ Imports everything
```

**Check for:**
- [ ] Dynamic imports for heavy components
- [ ] No unnecessary dependencies imported
- [ ] Tree-shakeable imports used
- [ ] No large libraries imported entirely

---

### 6. Security

```typescript
// ✅ Sanitize user input
import { sanitize } from 'dompurify'

function UserContent({ content }: { content: string }) {
  return <div dangerouslySetInnerHTML={{ __html: sanitize(content) }} />
}

// ✅ Validate on server
// app/api/user/route.ts
export async function POST(request: Request) {
  const body = await request.json()

  // Validate input
  if (!body.email || !isValidEmail(body.email)) {
    return new Response('Invalid email', { status: 400 })
  }

  // Continue...
}

// ❌ Never expose secrets
// ❌ const API_KEY = "sk_live_abc123"
// ✅ Use environment variables
const apiKey = process.env.API_KEY
```

**Check for:**
- [ ] User input validated and sanitized
- [ ] No hardcoded secrets or API keys
- [ ] Environment variables used properly
- [ ] SQL injection prevention (if using database)
- [ ] XSS prevention (sanitize HTML content)
- [ ] CSRF protection on forms (Next.js handles this)
- [ ] Proper authentication/authorization checks

---

### 7. Testing

```typescript
// ✅ Good test structure
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  it('renders with default variant', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies variant classes correctly', () => {
    render(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole('button')).toHaveClass('border-border')
  })
})
```

**Check for:**
- [ ] Tests exist for new features
- [ ] Tests describe behavior, not implementation
- [ ] Edge cases covered (empty state, error state, loading state)
- [ ] Accessibility tested (screen reader compatibility)
- [ ] Tests are deterministic (no flaky tests)
- [ ] Test names are descriptive

---

## Feedback Guidelines

### Priority Labels

Use these labels to indicate severity:

- 🔴 **[blocking]** - Must fix before merge
- 🟡 **[important]** - Should fix, discuss if disagree
- 🟢 **[nit]** - Nice to have, not blocking
- 💡 **[suggestion]** - Alternative approach to consider
- 📚 **[learning]** - Educational comment, no action needed
- 🎉 **[praise]** - Good work, keep it up!

### Example Comments

```markdown
🔴 [blocking] This component uses `any` type which defeats type safety.
Please define a proper interface:

interface ButtonProps {
  variant?: "default" | "outline"
  onClick?: () => void
}

---

🟡 [important] This data fetch happens on every render. Consider moving
this to a server component or using React Query for caching.

---

🟢 [nit] Consider renaming `data` to `userData` for clarity.

---

💡 [suggestion] Have you considered using the `useCallback` hook here
to prevent unnecessary re-renders?

---

🎉 [praise] Excellent use of TypeScript generics here! This makes the
component very reusable.
```

### Constructive Feedback

**Do:**
- ✅ Be specific and actionable
- ✅ Explain *why* something is an issue
- ✅ Suggest solutions or alternatives
- ✅ Ask questions to understand decisions
- ✅ Praise good work

**Don't:**
- ❌ Make it personal ("You always...")
- ❌ Be vague ("This is wrong")
- ❌ Nitpick formatting (use linters)
- ❌ Request changes outside of scope
- ❌ Rewrite to your personal preference

---

## PR Size Guidelines

- **Small**: < 200 lines - Easy to review, preferred
- **Medium**: 200-400 lines - Acceptable, may need focused time
- **Large**: 400-800 lines - Consider splitting
- **Too Large**: > 800 lines - Please split into multiple PRs

**For large features**: Create multiple PRs:
1. First PR: Core abstractions and types
2. Second PR: Implementation
3. Third PR: Integration and tests

---

## Quick Reference Checklist

Copy this into your PR review:

```markdown
### Code Review Checklist

#### TypeScript
- [ ] No `any` types used
- [ ] Proper interfaces/types defined
- [ ] Imports organized correctly

#### React/Next.js
- [ ] Server components by default
- [ ] `"use client"` only when necessary
- [ ] Proper data fetching patterns

#### Styling
- [ ] CVA used for variants
- [ ] Theme colors used (no hardcoded)
- [ ] Responsive design considered

#### Accessibility
- [ ] Semantic HTML used
- [ ] ARIA labels where needed
- [ ] Keyboard navigation works
- [ ] Focus states visible

#### Performance
- [ ] Next.js Image component used
- [ ] No unnecessary re-renders
- [ ] Dynamic imports for heavy components

#### Security
- [ ] Input validated
- [ ] No hardcoded secrets
- [ ] XSS prevention

#### Testing
- [ ] Tests cover new features
- [ ] Edge cases tested
- [ ] Tests are readable
```

---

## Resources

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [React 19 Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [ShadCN UI](https://ui.shadcn.com/)
- [Web Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)

---

## Questions?

If you're unsure about any review feedback or need clarification on standards:
1. Ask in the PR comments
2. Request a pairing session for complex issues
3. Discuss in team meetings for architectural decisions
