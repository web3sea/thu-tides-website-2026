# Contributing to Thu Tides Website

Thank you for contributing! This guide will help you get started and ensure your contributions meet our quality standards.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Pull Request Process](#pull-request-process)
- [Code Review](#code-review)

## Getting Started

### Prerequisites

- **Node.js**: v20 or higher
- **pnpm**: v8 or higher
- **Git**: Latest version

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/thu-tides-website.git
   cd thu-tides-website
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Project Structure

```
thu-tides-website/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   └── ui/               # ShadCN UI components
├── lib/                  # Utility functions
│   └── utils.ts         # Helper utilities
├── public/              # Static assets
├── CODE_REVIEW.md       # Code review standards
└── CONTRIBUTING.md      # This file
```

## Development Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
# For features
git checkout -b feature/your-feature-name

# For bug fixes
git checkout -b fix/bug-description

# For documentation
git checkout -b docs/what-you-are-documenting
```

### 2. Make Your Changes

- Follow our [code standards](#code-standards)
- Write meaningful commit messages
- Test your changes locally

### 3. Run Quality Checks

Before committing, ensure your code passes all checks:

```bash
# Lint your code
pnpm run lint

# Type check
pnpm exec tsc --noEmit

# Build check
pnpm run build
```

### 4. Commit Your Changes

Use conventional commit messages:

```bash
# Format: <type>(<scope>): <description>

git commit -m "feat(button): add loading state"
git commit -m "fix(nav): resolve mobile menu overflow"
git commit -m "docs(readme): update installation steps"
git commit -m "refactor(utils): simplify cn function"
```

**Commit types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### 5. Push and Create PR

```bash
git push origin your-branch-name
```

Then create a Pull Request on GitHub.

## Code Standards

### TypeScript

#### ✅ Type Safety
```typescript
// ✅ DO: Use proper types
interface UserProps {
  name: string
  age: number
}

function User({ name, age }: UserProps) {
  return <div>{name}, {age}</div>
}

// ❌ DON'T: Use any
function User({ name, age }: any) {
  return <div>{name}, {age}</div>
}
```

#### ✅ Import Organization
```typescript
// 1. React/Next.js
import { Metadata } from "next"

// 2. External libraries
import { cva } from "class-variance-authority"

// 3. Internal utilities
import { cn } from "@/lib/utils"

// 4. Components
import { Button } from "@/components/ui/button"

// 5. Types
import type { User } from "@/types"
```

### React Components

#### ✅ Server Components (Default)
```typescript
// app/page.tsx - Server component by default
export default async function Page() {
  const data = await fetchData() // Can use async/await
  return <div>{data}</div>
}
```

#### ✅ Client Components (When Needed)
```typescript
// components/counter.tsx - Use "use client" for interactivity
"use client"

import { useState } from "react"

export function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

**Use `"use client"` only when you need:**
- React hooks (useState, useEffect, etc.)
- Event handlers (onClick, onChange, etc.)
- Browser APIs (window, document, etc.)
- External libraries that depend on client-side features

### Styling with Tailwind

#### ✅ Component Variants with CVA
```typescript
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "rounded-4xl border transition-all", // base
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

export function Button({ variant, size, className, ...props }) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}
```

#### ✅ Use Theme Colors
```typescript
// ✅ DO: Use theme colors
className="bg-primary text-primary-foreground"
className="bg-secondary hover:bg-secondary/80"

// ❌ DON'T: Use hardcoded colors
className="bg-blue-500 text-white"
className="bg-gray-100"
```

### Accessibility

Always consider accessibility:

```typescript
// ✅ Semantic HTML
<button type="button">Click me</button>
<nav>...</nav>
<main>...</main>

// ✅ ARIA labels
<button aria-label="Close dialog">×</button>

// ✅ Form labels
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// ✅ Alt text
<Image src="/hero.jpg" alt="Beach at sunset" width={800} height={600} />

// ✅ Keyboard navigation
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  Interactive element
</div>
```

### Performance

```typescript
// ✅ Use Next.js Image
import Image from "next/image"
<Image src="/hero.jpg" alt="Hero" width={1200} height={600} priority />

// ✅ Dynamic imports for heavy components
import dynamic from 'next/dynamic'
const HeavyChart = dynamic(() => import('@/components/chart'))

// ✅ Proper caching
const data = await fetch('https://api.example.com/data', {
  cache: 'force-cache', // or 'no-store'
})
```

## Pull Request Process

### 1. Before Creating PR

- [ ] All quality checks pass (lint, type check, build)
- [ ] Code follows our standards
- [ ] Changes tested locally
- [ ] Branch up to date with main
- [ ] Meaningful commit messages

### 2. Create Pull Request

Use our PR template (auto-populated on GitHub):
- Clear description of changes
- Link related issues
- Add screenshots/videos if applicable
- Complete the checklist

### 3. PR Size Guidelines

- **Small** (<200 lines): ✅ Preferred
- **Medium** (200-400 lines): Acceptable
- **Large** (400-800 lines): Consider splitting
- **Too Large** (>800 lines): Please split

For large features, create multiple PRs:
1. Core abstractions and types
2. Implementation
3. Integration and tests

### 4. CI Checks

All PRs must pass:
- ✅ ESLint (code quality)
- ✅ TypeScript (type safety)
- ✅ Build (no build errors)
- ✅ Tests (when implemented)

### 5. Code Review

- PRs require **1 approval** before merging
- Address all review comments
- Mark conversations as resolved when fixed
- Request re-review after changes

## Code Review

### For Authors

**Responding to feedback:**
- Be open to suggestions
- Ask questions if unclear
- Explain your reasoning when you disagree
- Don't take feedback personally

**When you disagree:**
```markdown
Thanks for the feedback! I chose this approach because [reason].
However, I'm open to the alternative if [concern] isn't an issue.
What do you think?
```

### For Reviewers

**Priority labels:**
- 🔴 **[blocking]** - Must fix
- 🟡 **[important]** - Should fix
- 🟢 **[nit]** - Nice to have
- 💡 **[suggestion]** - Consider this
- 🎉 **[praise]** - Good work!

**Example comments:**
```markdown
🔴 [blocking] This creates a memory leak. Please move the event
listener cleanup to a useEffect cleanup function.

🟡 [important] This fetches data on every render. Consider using
React Query or moving this to a server component.

🟢 [nit] Consider renaming `data` to `userData` for clarity.

🎉 [praise] Excellent type safety here! The generic constraints
make this very flexible.
```

See [CODE_REVIEW.md](./CODE_REVIEW.md) for detailed review guidelines.

## Common Issues

### TypeScript Errors

```bash
# Type check errors
pnpm exec tsc --noEmit

# Fix: Define proper types
interface Props {
  name: string
  age: number
}
```

### Linting Errors

```bash
# Check lint errors
pnpm run lint

# Auto-fix when possible
pnpm run lint --fix
```

### Build Errors

```bash
# Check build errors
pnpm run build

# Common causes:
# - Missing dependencies
# - Type errors
# - Invalid imports
```

## Need Help?

- **Code Review Questions**: Comment on your PR
- **Technical Questions**: Open a discussion
- **Bug Reports**: Create an issue
- **Feature Requests**: Create an issue with `[Feature]` prefix

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [ShadCN UI](https://ui.shadcn.com/)

---

Thank you for contributing to Thu Tides Website! 🌊
