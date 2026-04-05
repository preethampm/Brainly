# AGENTS.md

## Commands

### Frontend (React + Vite + TypeScript + TailwindCSS)
```bash
cd Frontend
bun run dev      # Start dev server
bun run build    # Production build
bun run lint     # ESLint check
bun run preview  # Preview production build
```

### Backend (Express + TypeScript)
```bash
cd Backend
bun run dev      # Build + start (tsc -b && node dest/index.js)
bun run build    # TypeScript build (tsc -b)
bun run start    # Run compiled (node dest/index.js)
```

### Single Test
- No test framework configured. Add Vitest or Jest for testing.

---

## Code Style

### TypeScript
- Use explicit types for function parameters and return values
- Avoid `any`, use `unknown` or proper types when possible
- Use `strict: true` in tsconfig.json

### React
- Functional components with hooks
- Named exports for components (`export function X()`)
- Colocate related files (component + styles + tests)
- Use `useEffect` cleanup for subscriptions

### Backend (Express)
- Async/await with try/catch for route handlers
- Proper error responses with status codes
- Use middleware for authentication

### Imports
- Use explicit named imports (not default)
- Group: external → internal → relative

### Naming
- Components: PascalCase (e.g., `Button.tsx`)
- Functions/variables: camelCase
- Files: kebab-case or PascalCase for components

### Supabase
- Frontend: use `@supabase/supabase-js` client from `src/lib/supabase.ts`
- Backend: use service role client from `src/supabase.ts` for admin operations
- Auth: store token in localStorage, send via `Authorization: Bearer <token>` header

### Styling
- TailwindCSS for all styling
- Use semantic class names
- Dark theme with gray-900 background

---

## Project Structure

```
Brainly/
├── Frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route pages
│   │   ├── hooks/        # Custom hooks
│   │   ├── lib/          # Supabase client
│   │   └── icons/        # Icon components
│   └── ...
├── Backend/
│   ├── src/
│   │   ├── index.ts      # Express routes
│   │   ├── middleware.ts # Auth middleware
│   │   ├── supabase.ts   # Supabase client
│   │   └── utils.ts      # Utility functions
│   └── .env              # Supabase credentials
└── ...
```

---

## Environment Variables

### Frontend (src/lib/supabase.ts)
- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY` (anon key)

### Backend (.env)
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

---

## Notes

- Supabase Auth handles user authentication (Google, GitHub, email/password)
- Row Level Security (RLS) policies protect user data
- OAuth redirect URL: `{origin}/dashboard`