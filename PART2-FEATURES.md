# Part 2 — Cumulative feature update

This package retains the Part 1 files and adds the next 10 separately implemented game pages (games 11–20), plus homepage profile/XP/level/game-count summary, visible achievement gallery, an international leaderboard page, and a shared cosmetic juice layer for playable game pages.

## Player profile and achievements
- The homepage reads the local profile from `gamersArcadeProfileV2` and the display name from `gamersArcadeGamerName`.
- Achievements are displayed on the homepage and the profile page. Progress is device-local until a backend is configured.

## International leaderboard
- `leaderboard.html` supports a Supabase-backed worldwide XP table and country codes.
- The included `supabase-config.js` is intentionally unconfigured. Add the project's URL and public anon/publishable key, run `supabase/schema.sql`, and deploy the submit-score function described in `STAGE3-SETUP.md` before claiming that rankings are live.
- Do not put a Supabase service-role key in client-side files. Production scoring should require authenticated players and server-side validation/rate limits.

## Game juice
- `arcade-juice.css` and `arcade-juice.js` add button feedback, small pointer particles, combo toasts, and optional sound effects. Sound starts off and is opt-in. Effects are cosmetic and do not alter game rules. Reduced-motion preferences are respected.

## Honest status
- This part includes 20 dedicated game implementations across Parts 1 and 2. The wider 500-page catalogue is not equivalent to 500 fully distinct playable games; those remaining games must still be implemented.
- Static syntax/ZIP checks are not a substitute for full browser gameplay tests. The live GitHub site has not been modified by this build.
