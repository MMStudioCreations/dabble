-- ============================================================
-- DABBLE — COVERING INDEXES
-- Designed for four hot query patterns:
-- 1. Home feed (events by date, active, category)
-- 2. Attendee count per event (aggregation)
-- 3. Per-user attendance lookup ("am I going?")
-- 4. Messages inbox (by receiver + read status)
-- ============================================================

-- Home feed: date-ordered, active events only (partial index = smaller, faster)
create index idx_events_feed
  on public.events (event_date asc, event_time asc, is_active)
  where is_active = true;

-- Events by business (e.g. business profile page)
create index idx_events_business_date
  on public.events (business_id, event_date asc)
  where is_active = true;

-- Events by category (future filter support)
create index idx_events_category_date
  on public.events (category, event_date asc)
  where is_active = true;

-- Attendee count per event — most frequent aggregation
create index idx_attendances_event_status
  on public.attendances (event_id, status);

-- Per-user attendance check (am I going to this specific event?)
create index idx_attendances_user_event
  on public.attendances (user_id, event_id);

-- Intentions by event (event detail page)
create index idx_intentions_event
  on public.intentions (event_id, created_at desc);

-- Messages inbox — unread messages for receiver
create index idx_messages_inbox
  on public.messages (receiver_id, read, created_at desc);

-- Messages by event context (conversation thread)
create index idx_messages_event
  on public.messages (event_id, created_at asc);

-- Profile neighborhood lookup (future geo filtering)
create index idx_profiles_neighborhood
  on public.profiles (neighborhood)
  where neighborhood is not null;
