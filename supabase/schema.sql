-- ============================================================
-- Portfolio de Maicol Aristizábal — Esquema completo de Supabase
-- Ejecuta los bloques en orden en el SQL Editor de Supabase.
-- ============================================================

-- ------------------------------------------------------------
-- BLOQUE 1 — Extensiones
-- ------------------------------------------------------------
create extension if not exists pgcrypto;

-- ------------------------------------------------------------
-- BLOQUE 2 — Tablas
-- ------------------------------------------------------------
create table if not exists public.visitors (
  id uuid primary key default gen_random_uuid(),
  visitor_hash text not null unique,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  total_sessions integer not null default 0,
  total_page_views integer not null default 0,
  total_events integer not null default 0,
  country_code text,
  country_name text,
  region text,
  city text,
  timezone text,
  language text,
  device_type text,
  os text,
  browser text,
  screen_width integer,
  screen_height integer,
  first_referrer text,
  first_source text,
  first_utm_source text,
  first_utm_medium text,
  first_utm_campaign text,
  is_bot boolean not null default false,
  is_owner boolean not null default false
);

create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  visitor_id uuid not null references public.visitors(id) on delete cascade,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  duration_seconds integer,
  page_view_count integer not null default 0,
  event_count integer not null default 0,
  max_scroll_depth integer not null default 0,
  entry_path text,
  exit_path text,
  referrer text,
  source text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  locale text,
  theme text,
  country_code text,
  city text,
  device_type text,
  os text,
  browser text,
  viewport_width integer,
  viewport_height integer,
  is_bounce boolean not null default true,
  converted boolean not null default false,
  time_to_conversion_seconds integer
);

create table if not exists public.page_views (
  id bigserial primary key,
  session_id uuid not null references public.sessions(id) on delete cascade,
  visitor_id uuid not null references public.visitors(id) on delete cascade,
  path text not null,
  locale text,
  title text,
  referrer text,
  viewed_at timestamptz not null default now(),
  time_on_page_seconds integer,
  scroll_depth integer
);

create table if not exists public.events (
  id bigserial primary key,
  session_id uuid not null references public.sessions(id) on delete cascade,
  visitor_id uuid not null references public.visitors(id) on delete cascade,
  name text not null,
  category text,
  label text,
  path text,
  locale text,
  theme text,
  value numeric,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.chat_conversations (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.sessions(id) on delete set null,
  visitor_id uuid references public.visitors(id) on delete set null,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  message_count integer not null default 0,
  locale text,
  mode text not null default 'standard',
  topics text[] not null default '{}',
  technologies_asked text[] not null default '{}',
  projects_asked text[] not null default '{}',
  lead_score integer not null default 0,
  had_unanswered boolean not null default false
);

create table if not exists public.chat_messages (
  id bigserial primary key,
  conversation_id uuid not null references public.chat_conversations(id) on delete cascade,
  role text not null check (role in ('user','assistant','system')),
  content text not null,
  tokens_in integer,
  tokens_out integer,
  latency_ms integer,
  was_answered boolean,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.sessions(id) on delete set null,
  visitor_id uuid references public.visitors(id) on delete set null,
  name text not null,
  email text not null,
  company text,
  project_type text,
  budget_range text,
  message text not null,
  locale text,
  source text,
  country_code text,
  status text not null default 'new' check (status in ('new','read','replied','archived','spam')),
  created_at timestamptz not null default now(),
  read_at timestamptz,
  replied_at timestamptz
);

create table if not exists public.daily_rollups (
  day date primary key,
  unique_visitors integer not null default 0,
  new_visitors integer not null default 0,
  returning_visitors integer not null default 0,
  sessions integer not null default 0,
  page_views integer not null default 0,
  events integer not null default 0,
  avg_session_seconds numeric(10,2),
  avg_scroll_depth numeric(5,2),
  bounce_rate numeric(5,2),
  conversions integer not null default 0,
  chat_conversations integer not null default 0,
  chat_messages integer not null default 0,
  by_country jsonb not null default '{}'::jsonb,
  by_source jsonb not null default '{}'::jsonb,
  by_device jsonb not null default '{}'::jsonb,
  by_path jsonb not null default '{}'::jsonb,
  by_event jsonb not null default '{}'::jsonb,
  computed_at timestamptz not null default now()
);

create table if not exists public.ai_reports (
  id uuid primary key default gen_random_uuid(),
  period_start date not null,
  period_end date not null,
  locale text not null default 'es',
  summary text not null,
  recommendations jsonb not null default '[]'::jsonb,
  metrics_snapshot jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- BLOQUE 3 — Índices
-- ------------------------------------------------------------
create index if not exists visitors_first_seen_idx on public.visitors (first_seen_at desc);
create index if not exists visitors_country_idx on public.visitors (country_code);
create index if not exists sessions_visitor_idx on public.sessions (visitor_id);
create index if not exists sessions_started_idx on public.sessions (started_at desc);
create index if not exists sessions_source_idx on public.sessions (source);
create index if not exists page_views_session_idx on public.page_views (session_id);
create index if not exists page_views_viewed_idx on public.page_views (viewed_at desc);
create index if not exists page_views_path_idx on public.page_views (path);
create index if not exists events_session_idx on public.events (session_id);
create index if not exists events_name_idx on public.events (name);
create index if not exists events_created_idx on public.events (created_at desc);
create index if not exists events_metadata_idx on public.events using gin (metadata);
create index if not exists chat_conversations_started_idx on public.chat_conversations (started_at desc);
create index if not exists chat_messages_conversation_idx on public.chat_messages (conversation_id);
create index if not exists chat_messages_created_idx on public.chat_messages (created_at desc);
create index if not exists contact_submissions_created_idx on public.contact_submissions (created_at desc);
create index if not exists contact_submissions_status_idx on public.contact_submissions (status);

-- ------------------------------------------------------------
-- BLOQUE 4 — Row Level Security y revocación de permisos
-- El acceso legítimo ocurre solo con la service_role key (omite RLS).
-- ------------------------------------------------------------
alter table public.visitors enable row level security;
alter table public.sessions enable row level security;
alter table public.page_views enable row level security;
alter table public.events enable row level security;
alter table public.chat_conversations enable row level security;
alter table public.chat_messages enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.daily_rollups enable row level security;
alter table public.ai_reports enable row level security;

revoke all on all tables in schema public from anon, authenticated;
revoke all on all sequences in schema public from anon, authenticated;

-- ------------------------------------------------------------
-- BLOQUE 5 — Vistas agregadas
-- ------------------------------------------------------------
create or replace view public.v_daily_stats as
select
  started_at::date as day,
  count(distinct visitor_id) as unique_visitors,
  count(*) as sessions,
  round(avg(duration_seconds)) as avg_session_seconds,
  round(100.0 * avg(case when is_bounce then 1 else 0 end), 2) as bounce_rate,
  count(*) filter (where converted) as conversions
from public.sessions
group by 1
order by 1 desc;

create or replace view public.v_traffic_sources as
select coalesce(source, 'Directo') as source,
       count(*) as sessions,
       count(*) filter (where converted) as conversions
from public.sessions
group by 1
order by 2 desc;

create or replace view public.v_geo_stats as
select country_code, region, city, count(*) as visitors
from public.sessions
group by 1, 2, 3
order by 4 desc;

create or replace view public.v_device_stats as
select device_type, os, browser, count(*) as sessions
from public.sessions
group by 1, 2, 3
order by 4 desc;

create or replace view public.v_top_pages as
select path,
       count(*) as views,
       round(avg(time_on_page_seconds)) as avg_time,
       round(avg(scroll_depth)) as avg_scroll
from public.page_views
group by 1
order by 2 desc;

create or replace view public.v_event_stats as
select name, count(*) as total
from public.events
group by 1
order by 2 desc;

create or replace view public.v_chat_stats as
select date_trunc('day', started_at)::date as day,
       count(*) as conversations,
       sum(message_count) as messages,
       count(*) filter (where had_unanswered) as unanswered
from public.chat_conversations
group by 1
order by 1 desc;

create or replace view public.v_funnel as
select
  (select count(distinct visitor_id) from public.sessions) as visits,
  (select count(*) from public.sessions where max_scroll_depth >= 50) as deep_scroll,
  (select count(distinct session_id) from public.events where name in ('project_open','project_view')) as project_interest,
  (select count(distinct session_id) from public.chat_conversations) as chat,
  (select count(*) from public.contact_submissions) as contact;

-- ------------------------------------------------------------
-- BLOQUE 6 — Funciones
-- ------------------------------------------------------------
create or replace function public.get_overview(from_date date, to_date date)
returns jsonb
language sql
stable
as $$
  select jsonb_build_object(
    'totals', jsonb_build_object(
      'visitors', (select count(distinct visitor_id) from public.sessions where started_at::date between from_date and to_date),
      'sessions', (select count(*) from public.sessions where started_at::date between from_date and to_date),
      'pageViews', (select count(*) from public.page_views where viewed_at::date between from_date and to_date),
      'events', (select count(*) from public.events where created_at::date between from_date and to_date),
      'conversions', (select count(*) from public.sessions where converted and started_at::date between from_date and to_date),
      'avgSessionSeconds', coalesce((select round(avg(duration_seconds)) from public.sessions where started_at::date between from_date and to_date and duration_seconds is not null), 0),
      'bounceRate', coalesce((select round(100.0 * avg(case when is_bounce then 1 else 0 end)) from public.sessions where started_at::date between from_date and to_date), 0),
      'avgScrollDepth', coalesce((select round(avg(max_scroll_depth)) from public.sessions where started_at::date between from_date and to_date), 0)
    ),
    'byCountry', coalesce((select jsonb_agg(t) from (select coalesce(country_code, '??') as label, count(*) as count from public.sessions where started_at::date between from_date and to_date group by 1 order by 2 desc limit 8) t), '[]'::jsonb),
    'bySource', coalesce((select jsonb_agg(t) from (select coalesce(source, 'Directo') as label, count(*) as count from public.sessions where started_at::date between from_date and to_date group by 1 order by 2 desc limit 8) t), '[]'::jsonb),
    'byDevice', coalesce((select jsonb_agg(t) from (select coalesce(device_type, 'unknown') as label, count(*) as count from public.sessions where started_at::date between from_date and to_date group by 1 order by 2 desc limit 6) t), '[]'::jsonb),
    'topPages', coalesce((select jsonb_agg(t) from (select path as label, count(*) as count from public.page_views where viewed_at::date between from_date and to_date group by 1 order by 2 desc limit 8) t), '[]'::jsonb),
    'byEvent', coalesce((select jsonb_agg(t) from (select name as label, count(*) as count from public.events where created_at::date between from_date and to_date group by 1 order by 2 desc limit 12) t), '[]'::jsonb),
    'chat', jsonb_build_object(
      'conversations', (select count(*) from public.chat_conversations where started_at::date between from_date and to_date),
      'messages', (select count(*) from public.chat_messages where created_at::date between from_date and to_date),
      'unanswered', (select count(*) from public.chat_conversations where had_unanswered and started_at::date between from_date and to_date)
    ),
    'contact', jsonb_build_object(
      'total', (select count(*) from public.contact_submissions where created_at::date between from_date and to_date),
      'unread', (select count(*) from public.contact_submissions where status = 'new')
    )
  );
$$;

create or replace function public.rollup_daily(target_day date)
returns void
language plpgsql
as $$
begin
  insert into public.daily_rollups as d (
    day, unique_visitors, sessions, page_views, events,
    avg_session_seconds, avg_scroll_depth, bounce_rate, conversions,
    chat_conversations, chat_messages, computed_at
  )
  select
    target_day,
    (select count(distinct visitor_id) from public.sessions where started_at::date = target_day),
    (select count(*) from public.sessions where started_at::date = target_day),
    (select count(*) from public.page_views where viewed_at::date = target_day),
    (select count(*) from public.events where created_at::date = target_day),
    (select round(avg(duration_seconds), 2) from public.sessions where started_at::date = target_day),
    (select round(avg(max_scroll_depth), 2) from public.sessions where started_at::date = target_day),
    (select round(100.0 * avg(case when is_bounce then 1 else 0 end), 2) from public.sessions where started_at::date = target_day),
    (select count(*) from public.sessions where converted and started_at::date = target_day),
    (select count(*) from public.chat_conversations where started_at::date = target_day),
    (select count(*) from public.chat_messages where created_at::date = target_day),
    now()
  on conflict (day) do update set
    unique_visitors = excluded.unique_visitors,
    sessions = excluded.sessions,
    page_views = excluded.page_views,
    events = excluded.events,
    avg_session_seconds = excluded.avg_session_seconds,
    avg_scroll_depth = excluded.avg_scroll_depth,
    bounce_rate = excluded.bounce_rate,
    conversions = excluded.conversions,
    chat_conversations = excluded.chat_conversations,
    chat_messages = excluded.chat_messages,
    computed_at = now();
end;
$$;

create or replace function public.purge_raw_data(days_to_keep integer)
returns void
language plpgsql
as $$
begin
  delete from public.page_views where viewed_at < now() - (days_to_keep || ' days')::interval;
  delete from public.events where created_at < now() - (days_to_keep || ' days')::interval;
  delete from public.chat_conversations where started_at < now() - interval '180 days';
end;
$$;

revoke execute on function public.get_overview(date, date) from anon, authenticated;
revoke execute on function public.rollup_daily(date) from anon, authenticated;
revoke execute on function public.purge_raw_data(integer) from anon, authenticated;

-- ------------------------------------------------------------
-- BLOQUE 7 — Programación de tareas (opcional, requiere pg_cron)
-- Si pg_cron no está disponible, usa el Vercel Cron configurado en vercel.json.
-- ------------------------------------------------------------
-- create extension if not exists pg_cron;
-- select cron.schedule('daily-rollup', '15 5 * * *', $$select public.rollup_daily((now() - interval '1 day')::date);$$);
-- select cron.schedule('purge-raw', '30 5 * * *', $$select public.purge_raw_data(90);$$);
