-- ============================================================
-- Function: attendees for a single event with profile join
-- Used by EventDetailScreen to avoid two round-trips
-- ============================================================
create or replace function get_event_attendees(p_event_id uuid)
returns table (
  attendance_id uuid,
  user_id       uuid,
  status        text,
  full_name     text,
  avatar_url    text,
  neighborhood  text,
  attended_at   timestamptz
)
language sql stable
as $$
  select
    a.id          as attendance_id,
    a.user_id,
    a.status,
    p.full_name,
    p.avatar_url,
    p.neighborhood,
    a.created_at  as attended_at
  from public.attendances a
  join public.profiles p on p.id = a.user_id
  where a.event_id = p_event_id
  order by a.created_at asc;
$$;
