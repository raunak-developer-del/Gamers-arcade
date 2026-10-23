# Gamers' Arcade — Stage 3: Live Leaderboard Integration

This cumulative package includes Stage 2 files plus a real Supabase integration scaffold. **It is not live until you configure Supabase and deploy the function.** No sample players are shown.

## Included
- `leaderboard.html`: live database reader; displays no fake/sample ranks.
- `supabase-config.js`: browser URL + public anon/publishable key placeholders.
- `supabase/schema.sql`: leaderboard table and read-only Row Level Security policy.
- `supabase/functions/submit-score/index.ts`: Edge Function for score submissions.
- All Stage 2 files and `index-stage1-backup.html`.

## Setup
1. Create a project at https://supabase.com/ .
2. In Supabase SQL Editor, run `supabase/schema.sql`.
3. In Project Settings > API, copy the Project URL and publishable/anon key into `supabase-config.js`.
4. Install the Supabase CLI on a computer, log in, link the project, and deploy the function:
   - `supabase login`
   - `supabase link --project-ref YOUR_PROJECT_REF`
   - `supabase functions deploy submit-score`
5. Ensure the Edge Function has `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` configured as server-side secrets (Supabase normally provides these to Edge Functions; verify in the project).
6. Set `ARCADE_ALLOWED_ORIGINS` to your exact GitHub Pages origin, e.g. `https://YOUR-USERNAME.github.io`. Do not use `*` for production.
7. Upload all files while preserving folder paths, including `supabase-config.js` next to `leaderboard.html`.
8. Open `leaderboard.html`. The status should change from NOT CONFIGURED to CONNECTED only when the database can be read.

## Security and fairness warning
The starter Edge Function validates field formats and numerical bounds, but a public caller can still forge a plausible score. Before using this as a competitive leaderboard, add Supabase Auth, per-user rate limits, duplicate/session checks, and server-side game-specific score validation. Do not store the service-role key in any public file. The browser anon/publishable key is okay only because RLS is configured.

## Notes
- All-time/weekly ranking filters are based on submitted score rows. The current implementation ranks each player by their best XP row in the selected query window; production rules may need to aggregate or keep a trusted XP balance.
- “Live” here means shared online data with manual refresh. Realtime push subscriptions can be added after the project is configured.
- This package was generated but has not been connected to a real Supabase project or tested against one.
