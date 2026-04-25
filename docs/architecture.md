# Dabble — System Architecture

## Overview

Dabble is a hyper-local social mobile app. The MVP architecture is intentionally lean: a single Expo app backed by Supabase. No custom backend server is needed — Supabase's built-in Auth, RLS, and Postgres handle all business logic at MVP scale.

## System Diagram

```
┌────────────────────────────────────────────────────┐
│              DABBLE MOBILE APP                      │
│         React Native + Expo (iOS + Android)         │
│                                                     │
│  Screens  →  Hooks  →  Supabase Client  →  Network │
└────────────────────┬────────────────────────────────┘
                     │ HTTPS / WebSocket (Realtime)
┌────────────────────▼────────────────────────────────┐
│                   SUPABASE                           │
│  ┌──────────┐  ┌────────┐  ┌──────────┐  ┌───────┐ │
│  │ Postgres │  │  Auth  │  │ Realtime │  │Storage│ │
│  │  + RLS   │  │  JWT   │  │    WS    │  │  R2   │ │
│  └──────────┘  └────────┘  └──────────┘  └───────┘ │
└─────────────────────────────────────────────────────┘
```

## Key Architecture Decisions

### ADR-001: Expo Managed Workflow
**Decision**: Use Expo managed workflow.
**Rationale**: OTA updates, no Xcode required on CI, Expo Go for rapid testing.
**Trade-off**: Less native module flexibility. Acceptable at MVP.

### ADR-002: Supabase as Complete Backend
**Decision**: Supabase handles auth, database, realtime, and storage.
**Rationale**: Eliminates need for a custom API server. Postgres + RLS + Auth in one. Free tier handles MVP load.
**Trade-off**: Vendor dependency. Mitigated by Postgres compatibility.

### ADR-003: RLS-First Security
**Decision**: All authorization at the database layer via RLS policies.
**Rationale**: Security-by-default. No middleware to forget. Policies co-located with schema.
**Trade-off**: More complex debugging. Supabase dashboard makes it manageable.

## Security Model

- All secrets in `.env` (never committed)
- Supabase anon key is safe to expose — RLS enforces access
- Service role key never used client-side (admin operations only)
- Zod validates all user inputs before Supabase SDK calls
- Auth errors return generic messages — email existence never leaked
