# ADR-002: Supabase RLS as Authorization Layer

**Date**: 2026-04-24
**Status**: Accepted

## Context

Dabble ships a Supabase anon key inside the mobile app bundle, which means any user can inspect it. The app needs a security model that remains safe even when the anon key is known.

## Decision

Enable Row Level Security on every table. No table is accessible without an explicit policy. Authorization logic lives entirely at the database layer — no custom middleware or API gateway.

## Rationale

**Defense in depth**: Even if the anon key leaks, RLS ensures users can only read/write their own data. There is no middleware layer to forget or misconfigure.

**Policy co-location**: RLS policies live in `backend/supabase/rls.sql`, versioned alongside schema changes. Auditing authorization requires reading one file.

**Principle of least privilege**:
- `businesses` and `events` are read-only for all authenticated users (admin writes via service role key, never client-side)
- `attendances` and `intentions` are publicly readable but write-protected to own records only
- `messages` are visible only to sender and receiver

**Service role key discipline**: The service role key bypasses RLS entirely. It is never shipped in client code. Admin operations (seeding data, managing businesses) use the Supabase dashboard or a server-side script with the service role key injected as an environment secret.

## Consequences

- Every new table must have RLS enabled and explicit policies before it is usable
- Debugging access denials requires checking RLS policies — Supabase dashboard policy tester helps
- `auth.uid()` must be trusted — Supabase Auth handles JWT validation before RLS evaluates
