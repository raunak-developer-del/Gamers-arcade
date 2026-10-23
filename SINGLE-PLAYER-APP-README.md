# Gamers' Arcade — Single Player App Build

## What changed
- Replaced the 500 individual `games/game-###.html` files with one reusable `play.html` player.
- All 500 catalogue entries now launch as `play.html?id=NUMBER`.
- Preserved `index.html` and the existing neon theme.
- Added PWA install support and a service worker for caching the homepage, catalogue, game config, runtime and styles.
- Retained difficulty selector, XP rewards and downloadable achievement card feature from the prior build.
- The installable app is served through GitHub Pages; this is a PWA, not a signed Play Store APK.
- Offline launch requires the site to have been visited online once and the service worker to finish caching.
- Supabase/global leaderboard integration is not fully wired by this package; it still needs project URL/key setup, auth, and server-side score validation.
- The 500 entries are configurations across 50 gameplay families, not 500 distinct core mechanics.
