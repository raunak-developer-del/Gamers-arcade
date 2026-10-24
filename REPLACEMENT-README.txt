GAMERS' ARCADE REPLACEMENT PACKAGE

Upload the contents of this folder to the ROOT of your GitHub Pages repository, preserving filenames.
Do not upload the outer folder itself as a nested folder.

Important files:
- index.html: homepage and 500-entry catalogue
- play.html: shared player page for all 500 game configurations
- batch4-runtime.js: gameplay engine and local XP/profile updates
- batch4-games-manifest.json: titles, IDs, families and configuration for all 500 entries
- batch4-games.css: shared game styles
- profile.html: profile and achievement display
- leaderboard.html: leaderboard page (global mode still requires Supabase configuration)
- service-worker.js: bumped cache version to avoid old cached pages
- manifest.webmanifest, arcade-icon.svg: PWA assets

The 500 entries are 500 configurations across 50 interaction families, not 500 separate HTML files or 500 wholly unique mechanics. They are launched through play.html?id=N.

XP behavior in this update:
- A completed game awards XP once per unique game ID on this browser/device.
- Reward is capped at 500 XP per game completion based on selected difficulty.
- XP, discovered game IDs, categories, and best scores are stored in gamersArcadeProfileV2, which is read by index.html and profile.html.
- The old ga-xp-total value is synchronized to the profile total when a game completes. Previously inflated legacy XP is not imported.

After upload: open the site in Chrome, refresh. If stale files remain, clear site data for the site or uninstall/reinstall the PWA.
