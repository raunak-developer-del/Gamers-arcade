-- Gamers' Arcade live leaderboard schema
-- Run this in Supabase Dashboard > SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.arcade_scores (
  id uuid primary key default gen_random_uuid(),
  player_id text not null,
  gamer_name text not null,
  country_code text not null default 'XX',
  game_id text not null,
  score bigint not null check (score >= 0),
  xp bigint not null default 0 check (xp >= 0),
  submitted_at timestamptz not null default now()
);

create index if not exists arcade_scores_xp_idx
  on public.arcade_scores (xp desc, submitted_at asc);
create index if not exists arcade_scores_game_idx
  on public.arcade_scores (game_id, score desc, submitted_at asc);
create index if not exists arcade_scores_week_idx
  on public.arcade_scores (submitted_at desc);

alter table public.arcade_scores enable row level security;

-- Public may read rankings; direct browser inserts/updates/deletes are blocked.
drop policy if exists "Anyone can read arcade scores" on public.arcade_scores;
create policy "Anyone can read arcade scores"
  on public.arcade_scores for select
  to anon, authenticated using (true);

revoke insert, update, delete on public.arcade_scores from anon, authenticated;
grant select on public.arcade_scores to anon, authenticated;

-- The Edge Function uses the service role key on the server only.
-- Never expose that key in GitHub Pages or supabase-config.js.
