-- ============================================================
-- DABBLE — DATABASE SCHEMA v1.0.0
-- PostgreSQL via Supabase
-- Execute in order: schema → rls → indexes → seed
-- ============================================================

create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES
-- 1:1 with auth.users — extended user data
-- ============================================================
create table public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  full_name    text        not null,
  avatar_url   text,
  bio          text,
  interests    text[]      not null default '{}',
  neighborhood text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Auto-create profile on Supabase auth signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'New Dabbler')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- BUSINESSES
-- Local Staten Island venues — admin-managed at MVP stage
-- ============================================================
create table public.businesses (
  id          uuid        primary key default uuid_generate_v4(),
  name        text        not null,
  address     text        not null,
  borough     text        not null default 'Staten Island',
  category    text        not null,
  description text,
  website     text,
  instagram   text,
  is_active   boolean     not null default true,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- EVENTS
-- Events hosted by businesses
-- ============================================================
create table public.events (
  id              uuid        primary key default uuid_generate_v4(),
  business_id     uuid        not null references public.businesses(id) on delete cascade,
  title           text        not null,
  description     text,
  category        text        not null,
  event_date      date        not null,
  event_time      time        not null,
  cover_image_url text,
  capacity        integer,
  is_active       boolean     not null default true,
  created_at      timestamptz not null default now()
);

-- ============================================================
-- ATTENDANCES
-- User signals going or interested for an event
-- One record per user per event (enforced by unique constraint)
-- ============================================================
create table public.attendances (
  id         uuid        primary key default uuid_generate_v4(),
  user_id    uuid        not null references public.profiles(id) on delete cascade,
  event_id   uuid        not null references public.events(id)   on delete cascade,
  status     text        not null check (status in ('going', 'interested')),
  created_at timestamptz not null default now(),
  unique (user_id, event_id)
);

-- ============================================================
-- INTENTIONS
-- User-posted intent with experience level signal
-- Lets experienced users find beginners and vice versa
-- ============================================================
create table public.intentions (
  id               uuid        primary key default uuid_generate_v4(),
  user_id          uuid        not null references public.profiles(id) on delete cascade,
  event_id         uuid        not null references public.events(id)   on delete cascade,
  message          text        not null,
  experience_level text        not null check (experience_level in ('beginner', 'casual', 'experienced')),
  created_at       timestamptz not null default now()
);

-- ============================================================
-- MESSAGES
-- Direct messages between users, scoped to an event for context
-- ============================================================
create table public.messages (
  id          uuid        primary key default uuid_generate_v4(),
  sender_id   uuid        not null references public.profiles(id) on delete cascade,
  receiver_id uuid        not null references public.profiles(id) on delete cascade,
  event_id    uuid        not null references public.events(id)   on delete cascade,
  content     text        not null,
  read        boolean     not null default false,
  created_at  timestamptz not null default now(),
  constraint no_self_message check (sender_id != receiver_id)
);
