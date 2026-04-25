# Dabble — Data Model Reference

## Tables

| Table | Purpose | RLS Model |
|---|---|---|
| `profiles` | Extended user data | Public read, own write |
| `businesses` | Staten Island venue partners | Public read (active only), admin write |
| `events` | Events hosted by businesses | Public read (active only), admin write |
| `attendances` | Who is going / interested | Public read, own write/delete |
| `intentions` | Posted intent with experience level | Public read, own write/delete |
| `messages` | DMs scoped to event context | Own read/write only |

## Relationships

```
auth.users (Supabase managed)
    └── profiles (1:1, auto-created on signup via trigger)
            └── attendances (1:N)
            └── intentions  (1:N)
            └── messages (1:N as sender)
            └── messages (1:N as receiver)

businesses
    └── events (1:N)
            └── attendances (1:N)
            └── intentions  (1:N)
            └── messages    (1:N, event context)
```

## Critical Constraints

| Constraint | Table | Rule |
|---|---|---|
| `unique(user_id, event_id)` | attendances | One attendance record per user per event |
| `no_self_message` | messages | Users cannot message themselves |
| `status IN (...)` | attendances | Only 'going' or 'interested' |
| `experience_level IN (...)` | intentions | Only 'beginner', 'casual', 'experienced' |

## Index Strategy

All foreign keys are indexed. Hot query paths have covering indexes. Partial indexes on `is_active = true` keep index size small. See `backend/supabase/indexes.sql` for full rationale.
