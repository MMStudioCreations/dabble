-- ============================================================
-- DABBLE — ROW LEVEL SECURITY POLICIES
-- Every table has RLS enabled. No exceptions.
-- Principle: least privilege, defense in depth.
-- ============================================================

-- PROFILES
alter table public.profiles enable row level security;

create policy "Profiles are publicly readable"
  on public.profiles for select using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- BUSINESSES (read-only for end users; admin writes via service role key)
alter table public.businesses enable row level security;

create policy "Active businesses are publicly readable"
  on public.businesses for select using (is_active = true);

-- EVENTS (read-only for end users)
alter table public.events enable row level security;

create policy "Active events are publicly readable"
  on public.events for select using (is_active = true);

-- ATTENDANCES
alter table public.attendances enable row level security;

create policy "Attendances are publicly readable"
  on public.attendances for select using (true);

create policy "Authenticated users can create their own attendance"
  on public.attendances for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own attendance"
  on public.attendances for update
  using (auth.uid() = user_id);

create policy "Users can delete their own attendance"
  on public.attendances for delete
  using (auth.uid() = user_id);

-- INTENTIONS
alter table public.intentions enable row level security;

create policy "Intentions are publicly readable"
  on public.intentions for select using (true);

create policy "Authenticated users can post intentions"
  on public.intentions for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own intentions"
  on public.intentions for delete
  using (auth.uid() = user_id);

-- MESSAGES (users only see their own conversations)
alter table public.messages enable row level security;

create policy "Users can read messages they sent or received"
  on public.messages for select
  using (auth.uid() = sender_id or auth.uid() = receiver_id);

create policy "Authenticated users can send messages"
  on public.messages for insert
  with check (auth.uid() = sender_id);

create policy "Receivers can mark messages as read"
  on public.messages for update
  using (auth.uid() = receiver_id)
  with check (auth.uid() = receiver_id);
