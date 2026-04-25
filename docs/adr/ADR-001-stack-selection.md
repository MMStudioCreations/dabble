# ADR-001: Stack Selection

**Date**: 2026-04-24
**Status**: Accepted

## Context

Dabble needs a mobile app that ships to both iOS and Android from a single codebase, with a backend that handles auth, a relational database, and real-time updates — all without requiring a dedicated backend engineering team at MVP stage.

## Decision

- **Mobile**: React Native + Expo (managed workflow)
- **Backend**: Supabase (PostgreSQL + Auth + Realtime + Storage)
- **Language**: TypeScript strict mode throughout
- **CI/CD**: GitHub Actions

## Rationale

**Expo managed workflow** removes native build toolchain from the critical path. Expo Go enables instant on-device testing without a simulator. OTA updates mean bug fixes ship without App Store review. The trade-off is reduced native module flexibility — acceptable at MVP where all dependencies are Expo-compatible.

**Supabase** provides auth, a fully managed Postgres instance, RLS-based authorization, and Realtime WebSocket subscriptions in a single platform. At MVP load (< 500 DAU), the free tier is sufficient. The anon key is safe to ship client-side because RLS enforces all access control at the database layer.

**TypeScript strict mode** with `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, and branded ID types catches ID mix-ups and null-safety issues at compile time rather than at runtime in production.

## Consequences

- CI must run `tsc --noEmit` and `expo-doctor` on every push
- Native modules not in Expo SDK require ejecting to bare workflow
- Supabase free tier has connection and storage limits — plan to upgrade at ~500 DAU
