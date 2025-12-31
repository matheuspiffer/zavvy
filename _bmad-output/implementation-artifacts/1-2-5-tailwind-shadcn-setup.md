# Story 1.2.5: Tailwind CSS & shadcn/ui Setup

Status: done

## Story

As a **Zavvy developer**,
I want Tailwind CSS and shadcn/ui configured in the admin app and shared UI package,
So that all components follow the design system specification.

## Acceptance Criteria

### AC1: packages/ui initialized with shadcn/ui
**Given** packages/ui is initialized
**When** I run `pnpm ui:add button` (or similar)
**Then** shadcn/ui components are added to the shared package
**And** components export correctly from @zavvy/ui

### AC2: Tailwind CSS working in apps/admin
**Given** apps/admin uses @zavvy/ui
**When** the app renders
**Then** Tailwind utility classes work correctly
**And** design tokens (colors, spacing, typography) match UX specification

### AC3: Design tokens configured
**Given** the tailwind.config.ts files
**When** components use theme colors
**Then** Primary color is Trust Green (#10B981)
**And** Font family is Inter (or Geist)
**And** Border radius is 8px-12px for friendly feel

### AC4: Base shadcn/ui components available
**Given** packages/ui
**When** components are exported
**Then** Button, Input, Card, Dialog, Form, and Toast are available
**And** they can be imported from @zavvy/ui

### AC5: Login and Dashboard refactored
**Given** the existing Login.tsx and Dashboard.tsx components
**When** they are updated
**Then** inline styles are replaced with Tailwind classes
**And** shared components from @zavvy/ui are used

---

## Tasks

### Task 1: Initialize packages/ui with shadcn/ui
- [x] 1.1 Create packages/ui folder structure
- [x] 1.2 Initialize package.json with correct name (@zavvy/ui)
- [x] 1.3 Configure components.json for monorepo setup
- [x] 1.4 Add TypeScript configuration (tsconfig.json)
- [x] 1.5 Create lib/utils.ts with cn() helper

### Task 2: Configure Tailwind CSS v4
- [x] 2.1 Create globals.css with Tailwind v4 CSS-first configuration
- [x] 2.2 Add CSS variables for colors (Trust Green oklch(0.60 0.16 160))
- [x] 2.3 Configure font family (Inter)
- [x] 2.4 Set border radius defaults using @theme directive
- [x] 2.5 Configure @tailwindcss/vite plugin

### Task 3: Add base shadcn/ui components
- [x] 3.1 Add Button component
- [x] 3.2 Add Input component
- [x] 3.3 Add Card component
- [x] 3.4 Add Dialog component
- [x] 3.5 Add Label component
- [x] 3.6 Add Toast/Sonner component
- [x] 3.7 Add Form component (with react-hook-form integration)
- [x] 3.8 Create packages/ui/src/index.ts to export all components

### Task 4: Configure apps/admin to use @zavvy/ui
- [x] 4.1 Add @zavvy/ui as dependency in apps/admin/package.json
- [x] 4.2 Update apps/admin/vite.config.ts with @tailwindcss/vite plugin
- [x] 4.3 Create apps/admin/src/index.css to import globals from @zavvy/ui
- [x] 4.4 Update main.tsx to import index.css

### Task 5: Refactor Login.tsx to use Tailwind
- [x] 5.1 Replace inline styles with Tailwind classes
- [x] 5.2 Use Button component from @zavvy/ui
- [x] 5.3 Use Input component from @zavvy/ui
- [x] 5.4 Use Card component for form container
- [x] 5.5 Use Label component from @zavvy/ui

### Task 6: Refactor Dashboard (index.tsx) to use Tailwind
- [x] 6.1 Replace inline styles with Tailwind classes
- [x] 6.2 Use Button component from @zavvy/ui
- [x] 6.3 Use Card component for dashboard panels
- [x] 6.4 Use CardHeader, CardTitle, CardDescription, CardContent

### Task 7: Update route components
- [x] 7.1 Update routes/__root.tsx to use Tailwind
- [x] 7.2 Update routes/login.tsx to use Tailwind
- [x] 7.3 Update routes/index.tsx to use Tailwind
- [x] 7.4 Verify all routes render correctly

### Task 8: Verify and test
- [x] 8.1 Run `pnpm typecheck` - admin and ui packages pass
- [x] 8.2 Run `pnpm dev:admin` - app starts correctly on port 3001
- [x] 8.3 Verify Login page renders with Tailwind styles
- [x] 8.4 Verify Dashboard renders with Tailwind styles
- [x] 8.5 Test component imports from @zavvy/ui

---

## Technical Notes

### Tailwind CSS v4 Configuration (CSS-first approach)

```css
/* packages/ui/src/globals.css */
@import "tailwindcss";

@theme {
  --font-sans: "Inter", system-ui, -apple-system, sans-serif;
  --radius-sm: 0.5rem;  /* 8px min per UX spec */
  --radius-lg: 0.625rem;
  --color-primary-500: oklch(0.60 0.16 160); /* Trust Green */
}

:root {
  --primary: oklch(0.60 0.16 160);
  --primary-foreground: oklch(0.985 0 0);
  /* ... shadcn/ui CSS variables */
}

@theme inline {
  --color-primary: var(--primary);
  /* ... maps CSS vars to Tailwind colors */
}
```

### Package Structure

```
packages/ui/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── form.tsx
│   │       ├── label.tsx
│   │       └── sonner.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── globals.css
│   └── index.ts
├── components.json
├── tsconfig.json
└── package.json
```

---

## Dependencies

- **Depends on:** Story 1.1 (Monorepo Foundation), Story 1.2 (Database & Auth)
- **Blocks:** Story 1.3+ (all admin UI stories)

---

## Dev Agent Record

### File List

**packages/ui:**
- packages/ui/package.json (modified - added react-hook-form, zod deps)
- packages/ui/tsconfig.json (modified - removed tailwind.config ref)
- packages/ui/components.json (modified - removed tailwind.config ref)
- packages/ui/src/index.ts (modified - added Form, InputProps exports)
- packages/ui/src/globals.css (modified - fixed radius-sm to 8px)
- packages/ui/src/lib/utils.ts
- packages/ui/src/components/ui/button.tsx (modified - added ButtonProps)
- packages/ui/src/components/ui/input.tsx (modified - added InputProps)
- packages/ui/src/components/ui/card.tsx
- packages/ui/src/components/ui/dialog.tsx
- packages/ui/src/components/ui/form.tsx (created - AC4 requirement)
- packages/ui/src/components/ui/label.tsx (modified)
- packages/ui/src/components/ui/sonner.tsx (modified - added React import)

**apps/admin:**
- apps/admin/package.json (modified)
- apps/admin/vite.config.ts (modified)
- apps/admin/index.html (modified - added Inter font)
- apps/admin/src/index.css (created)
- apps/admin/src/main.tsx (modified)
- apps/admin/src/routes/__root.tsx (modified)
- apps/admin/src/routes/login.tsx (modified)
- apps/admin/src/routes/index.tsx (modified)

**Deleted (dead code cleanup):**
- ~~apps/admin/src/pages/Login.tsx~~ (deleted)
- ~~apps/admin/src/pages/Dashboard.tsx~~ (deleted)

### Change Log

| Date | Change | Author |
|------|--------|--------|
| 2025-12-29 | Story created | Claude Opus 4.5 |
| 2025-12-29 | Implemented Tailwind v4 CSS-first config | Claude Opus 4.5 |
| 2025-12-29 | Added shadcn/ui components | Claude Opus 4.5 |
| 2025-12-29 | Refactored admin routes with Tailwind | Claude Opus 4.5 |
| 2025-12-29 | Verified typecheck and dev server | Claude Opus 4.5 |
| 2025-12-29 | **Code Review Fixes:** Added Form component (AC4), Inter font (AC3), fixed radius-sm to 8px, deleted dead code /pages/*.tsx, added InputProps/ButtonProps types, fixed sonner.tsx React import, removed tailwind.config.ts references | Claude Opus 4.5 |
