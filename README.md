# Brainly

A web application for managing and sharing content.

## Features

- User authentication (Google, GitHub, email/password)
- Create, read, delete content
- Tag-based filtering
- Share content with a unique link

## Tech Stack

- **Frontend:** React, Vite, TypeScript, Tailwind CSS
- **Backend:** Express, TypeScript
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth

## Getting Started

### Prerequisites

- Bun (recommended) or Node.js

### Installation

1. **Clone the repository:**
   ```cmd
   git clone https://github.com/preethampm/Brainly.git
   cd Brainly
   ```

2. **Backend Setup:**
   ```cmd
   cd Backend
   bun install
   ```

3. **Frontend Setup:**
   ```cmd
   cd Frontend
   bun install
   ```

### Environment Variables

Create `Backend/.env`:
```
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Running the Application

1. **Start the backend server:**
   ```cmd
   cd Backend
   bun run dev
   ```

2. **Start the frontend server:**
   ```cmd
   cd Frontend
   bun run dev
   ```

3. Open `http://localhost:5173`

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL schema (see AGENTS.md for tables)
3. Enable OAuth providers: **Authentication → Providers**
4. Add redirect URL: **Authentication → URL Configuration → Redirect URLs**
   - `http://localhost:5173/dashboard`

## Commands

| Component | Command |
|-----------|---------|
| Frontend dev | `bun run dev` |
| Frontend build | `bun run build` |
| Frontend lint | `bun run lint` |
| Backend dev | `bun run dev` |
| Backend build | `bun run build` |

## Project Structure

```
Brainly/
├── Backend/
│   ├── src/
│   │   ├── index.ts      # Express routes
│   │   ├── middleware.ts # Auth middleware
│   │   ├── supabase.ts   # Supabase client
│   │   └── utils.ts
│   └── .env
├── Frontend/
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Route pages
│   │   ├── hooks/        # Custom hooks
│   │   └── lib/          # Supabase client
│   └── ...
└── README.md
```
