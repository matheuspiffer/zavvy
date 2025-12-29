# Zavvy

WhatsApp-first scheduling SaaS for Brazilian professionals.

## Tech Stack

- **Monorepo**: Turborepo + pnpm
- **Frontend**: React 19 + Vite 6 + TypeScript
- **Landing**: Next.js 15
- **Packages**: Internal shared packages with `@zavvy/` namespace

## Prerequisites

- Node.js >= 20.x
- pnpm 9.x (via corepack)

```bash
corepack enable
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Start all apps in development mode
pnpm dev

# Start only admin app (localhost:3001)
pnpm dev:admin

# Start only landing page
pnpm dev:landing
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm dev:admin` | Start admin app on localhost:3001 |
| `pnpm dev:landing` | Start landing page |
| `pnpm build` | Build all packages and apps for production |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm lint` | Run ESLint across all packages |
| `pnpm test` | Run tests |
| `pnpm clean` | Clean all build artifacts and node_modules |

## Project Structure

```
zavvy/
├── apps/
│   ├── admin/          # Vite + React admin panel
│   └── landing/        # Next.js landing page
├── packages/
│   ├── db/             # Drizzle ORM schema
│   ├── auth/           # Better Auth configuration
│   ├── ui/             # Shared UI components (shadcn/ui)
│   └── shared/         # Shared utilities and Zod schemas
├── package.json        # Workspace root
├── pnpm-workspace.yaml # Workspace configuration
├── turbo.json          # Turborepo task configuration
└── tsconfig.base.json  # Shared TypeScript config
```

## Package Naming

All internal packages use the `@zavvy/` namespace:

- `@zavvy/admin` - Admin application
- `@zavvy/landing` - Landing page
- `@zavvy/db` - Database package
- `@zavvy/auth` - Authentication package
- `@zavvy/ui` - UI components
- `@zavvy/shared` - Shared utilities

## Workspace Dependencies

Use `workspace:*` protocol for internal dependencies:

```json
{
  "dependencies": {
    "@zavvy/shared": "workspace:*"
  }
}
```
