# Dabble — Web

> Connect. Discover. Experience. — A hyper-local social PWA for Staten Island events.

**GitHub:** [mmstudiocreations/dabble](https://github.com/mmstudiocreations/dabble)

---

## What It Does

Dabble connects people through real-world events at local Staten Island venues — karaoke nights, wine and paint, escape rooms, trivia, and more. Users discover what's happening nearby, signal their attendance, see who else is going, and coordinate before they show up.

This `apps/web` package is the Next.js 15 Progressive Web App (PWA) that delivers a native-app-like experience directly in the browser.

---

## Features

- **Authentication** — Email/password sign-up and login via Supabase Auth
- **Event Discovery** — Browse upcoming local events by venue, date, and category
- **Attendance Signaling** — Mark yourself as going or interested in an event
- **Attendee Visibility** — See who else plans to attend before you commit
- **Realtime Updates** — Attendance counts update live via Supabase Realtime
- **Installable PWA** — Add to home screen on iOS and Android for a native feel
- **Profile & Settings** — Manage your profile, bio, and interests

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| UI | [React 19](https://react.dev/) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 3 |
| Backend / DB | [Supabase](https://supabase.com/) (PostgreSQL, Auth, Realtime) |
| Validation | Zod |
| Date handling | date-fns |
| PWA | Web App Manifest + Service Worker |

---

## Quick Start

### Prerequisites

- Node.js 20+
- A Supabase project (see [Database Setup](#database-setup))

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/mmstudiocreations/dabble.git
cd dabble

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp apps/web/.env.example apps/web/.env.local
# Edit apps/web/.env.local and fill in your Supabase credentials

# 4. Start the development server
cd apps/web
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Deployment

### Vercel (recommended)

1. Push the repo to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**.
3. Import the `mmstudiocreations/dabble` repository.
4. Set the **Root Directory** to `apps/web`.
5. Add environment variables (see [Environment Variables](#environment-variables)).
6. Click **Deploy**.

Vercel detects Next.js automatically — no additional build configuration is needed.

---

## Database Setup

1. Create a free project at [supabase.com](https://supabase.com).
2. In the Supabase SQL editor, run the following scripts in order:
   ```
   backend/supabase/schema.sql   -- tables and relationships
   backend/supabase/rls.sql      -- row-level security policies
   backend/supabase/indexes.sql  -- performance indexes
   backend/supabase/seed.sql     -- Staten Island venues and sample events
   ```
3. Copy your **Project URL** and **anon public key** from  
   *Project Settings → API* into your `.env.local`.

---

## Project Structure

```
apps/web/
├── app/
│   ├── (auth)/
│   │   ├── login/          # Login page
│   │   └── signup/         # Sign-up page
│   ├── (authenticated)/
│   │   ├── events/
│   │   │   └── [id]/       # Event detail page
│   │   ├── profile/        # User profile page
│   │   ├── settings/       # Account settings page
│   │   └── layout.tsx      # Authenticated shell layout
│   ├── globals.css
│   ├── layout.tsx          # Root layout (fonts, metadata, PWA)
│   └── page.tsx            # Landing / redirect page
├── components/
│   ├── AttendeeList.tsx
│   ├── AuthProvider.tsx
│   ├── Button.tsx
│   ├── EventCard.tsx
│   ├── IntentionBadge.tsx
│   └── ServiceWorker.tsx
├── hooks/
│   ├── useAttendance.ts
│   ├── useAuth.ts
│   └── useEvents.ts
├── lib/
│   ├── supabase.ts         # Supabase client
│   └── validation.ts       # Zod schemas
├── public/
│   ├── manifest.json       # PWA manifest
│   └── sw.js               # Service worker
├── types/
│   └── index.ts            # Shared TypeScript types
├── .env.example
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## Environment Variables

Create `apps/web/.env.local` (copy from `.env.example`):

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL (`https://<id>.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous/public API key |

Both values are found in your Supabase project under *Settings → API*.

> **Never commit `.env.local` to version control.** It is already listed in `.gitignore`.

---

## Available Scripts

Run these from the `apps/web/` directory:

| Script | Command | Description |
|---|---|---|
| Dev server | `npm run dev` | Start Next.js in development mode with hot reload |
| Production build | `npm run build` | Compile and optimize for production |
| Production server | `npm run start` | Serve the production build locally |
| Lint | `npm run lint` | Run ESLint across the codebase |
| Type check | `npm run type-check` | Run `tsc --noEmit` to check types without emitting |
