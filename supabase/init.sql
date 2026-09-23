-- Wishes: RSVP & Wall of Wishes
-- Jalankan SQL ini di Supabase Dashboard > SQL Editor.

create table if not exists public.wishes (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  status text not null check (status in ('Hadir', 'Ragu-ragu', 'Tidak Hadir')),
  pax text not null default '1',
  message text not null check (char_length(message) between 1 and 600),
  created_at timestamptz not null default now()
);

alter table public.wishes enable row level security;

-- Izinkan publik (anon) menambah dan membaca ucapan via front-end.
drop policy if exists "allow_public_insert" on public.wishes;
create policy "allow_public_insert"
  on public.wishes
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "allow_public_select" on public.wishes;
create policy "allow_public_select"
  on public.wishes
  for select
  to anon, authenticated
  using (true);

-- Index urut terbaru untuk query feed dan admin
create index if not exists idx_wishes_created_at_desc on public.wishes (created_at desc);