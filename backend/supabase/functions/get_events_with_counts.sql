-- ============================================================
-- CTE function: events with attendee counts in one query
-- Eliminates N+1 count lookups on the home feed
-- ============================================================
create or replace function get_events_with_counts(
  p_limit  integer default 50,
  p_offset integer default 0
)
returns table (
  id              uuid,
  business_id     uuid,
  title           text,
  description     text,
  category        text,
  event_date      date,
  event_time      time,
  cover_image_url text,
  capacity        integer,
  created_at      timestamptz,
  business_name   text,
  business_address text,
  attendee_count  bigint
)
language sql stable
as $$
  with event_counts as (
    select
      event_id,
      count(*) filter (where status = 'going') as attendee_count
    from public.attendances
    group by event_id
  )
  select
    e.id,
    e.business_id,
    e.title,
    e.description,
    e.category,
    e.event_date,
    e.event_time,
    e.cover_image_url,
    e.capacity,
    e.created_at,
    b.name        as business_name,
    b.address     as business_address,
    coalesce(ec.attendee_count, 0) as attendee_count
  from public.events e
  join public.businesses b on b.id = e.business_id
  left join event_counts ec on ec.event_id = e.id
  where e.is_active = true
    and e.event_date >= current_date
  order by e.event_date asc, e.event_time asc
  limit  p_limit
  offset p_offset;
$$;
