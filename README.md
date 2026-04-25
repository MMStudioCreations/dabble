# Dabble

A local social app connecting people through real-world events at Staten Island businesses.

## What It Does

Users discover events at local venues — karaoke nights, wine and paint, escape rooms, trivia nights — see who else is going, signal attendance, and coordinate in-app before showing up together.

## Stack

- **Mobile**: React Native + Expo (managed workflow, iOS + Android from one codebase)
- **Backend**: Supabase (PostgreSQL, Auth, Realtime, Storage)
- **Language**: TypeScript (strict mode throughout)
- **CI/CD**: GitHub Actions

## Local Development

### Prerequisites
- Node.js 20+
- Expo Go app on your phone (or iOS Simulator / Android Emulator)

### Setup
```bash
git clone https://github.com/YOUR_USERNAME/dabble.git
cd dabble
npm install
cd apps/mobile
cp .env.example .env
# Fill in EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY
npx expo start
```

### Database Setup
1. Create a new project at supabase.com (free tier)
2. Run backend/supabase/schema.sql in the SQL editor
3. Run backend/supabase/rls.sql in the SQL editor
4. Run backend/supabase/indexes.sql in the SQL editor
5. Run backend/supabase/seed.sql to load Staten Island business and event data

## Project Structure

- `apps/mobile` — Expo React Native app
- `backend/supabase` — Database schema, RLS policies, indexes, seed data
- `docs/` — Architecture decisions and schema reference
