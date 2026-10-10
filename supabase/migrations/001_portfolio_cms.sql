create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.portfolio_content (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.portfolio_content enable row level security;

drop policy if exists "Admins can read own membership" on public.admin_users;
create policy "Admins can read own membership"
on public.admin_users for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Public can read portfolio" on public.portfolio_content;
create policy "Public can read portfolio"
on public.portfolio_content for select
using (true);

drop policy if exists "Admins can insert portfolio" on public.portfolio_content;
create policy "Admins can insert portfolio"
on public.portfolio_content for insert
to authenticated
with check (exists (select 1 from public.admin_users where user_id = auth.uid()));

drop policy if exists "Admins can update portfolio" on public.portfolio_content;
create policy "Admins can update portfolio"
on public.portfolio_content for update
to authenticated
using (exists (select 1 from public.admin_users where user_id = auth.uid()))
with check (exists (select 1 from public.admin_users where user_id = auth.uid()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio-media',
  'portfolio-media',
  true,
  52428800,
  array['image/jpeg','image/png','image/webp','image/gif','video/mp4','video/webm','application/pdf']
)
on conflict (id) do update set
  public = true,
  file_size_limit = 52428800,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can view portfolio media" on storage.objects;
create policy "Public can view portfolio media"
on storage.objects for select
using (bucket_id = 'portfolio-media');

drop policy if exists "Admins can upload portfolio media" on storage.objects;
create policy "Admins can upload portfolio media"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'portfolio-media'
  and exists (select 1 from public.admin_users where user_id = auth.uid())
);

drop policy if exists "Admins can update portfolio media" on storage.objects;
create policy "Admins can update portfolio media"
on storage.objects for update
to authenticated
using (
  bucket_id = 'portfolio-media'
  and exists (select 1 from public.admin_users where user_id = auth.uid())
);

drop policy if exists "Admins can delete portfolio media" on storage.objects;
create policy "Admins can delete portfolio media"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'portfolio-media'
  and exists (select 1 from public.admin_users where user_id = auth.uid())
);

-- After creating the one admin account in Authentication > Users, authorize it once:
-- insert into public.admin_users (user_id)
-- select id from auth.users where email = 'your-admin-email@example.com';
