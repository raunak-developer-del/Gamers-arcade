# Gamers’ Arcade — Ecosystem Upgrade

This is a **patch package** for the existing Part 5 / 500-entry Gamers’ Arcade site. It upgrades the shared website shell and common launcher without including or replacing the standalone `pacman.html` or `candy-crush.html` files.

## Included files (10)
- `index.html` — unified arcade homepage, profile panel, search, category/sort controls, favorites/recent/unplayed filters, and install option.
- `styles.css` — cohesive responsive neon design system and consistent card styling.
- `app.js` — catalogue rendering, filtering, favorites, recent-played view, profile display, and keyboard search shortcut.
- `play.html` — upgraded shared game screen with pause/resume, sound toggle, high-score display, and consistent navigation.
- `microgames.js` — progress/high-score hooks, pause support for canvas games, and interactive fallback modes for previously unfinished catalogue kinds.
- `profile.js` — local XP, player name, favorites, recent games, high scores, and achievement badges.
- `manifest.webmanifest`, `service-worker.js`, `arcade-icon.svg` — install/offline support for the shared site shell.

`games-data.js` is intentionally not included because the existing 500-entry catalogue is unchanged. `pacman.html` and `candy-crush.html` are also intentionally omitted so they remain untouched. Keep `engine.js` as well.

## Apply to GitHub Pages
1. Back up your repository or commit the current version first.
2. Extract this ZIP.
3. In the repository’s published folder, upload the 10 included files and replace matching files.
4. **Do not delete or replace** `games-data.js`, `pacman.html`, `candy-crush.html`, or `engine.js`.
5. Commit the changes, wait for Pages to deploy, then hard-refresh with Ctrl+Shift+R.
6. Test search, category filter, favorites, profile name, XP after playing a new game, pause/resume, and offline loading after first visit.

## Honest status
- The profile, favorites, recent list, XP, and achievements are saved in the browser on that device; there is no online account or cross-device sync.
- The service worker caches the core shell and game files after the first successful load. Offline behaviour depends on browser support and whether assets were cached successfully.
- The 500 catalogue entries still do not all have 500 bespoke game engines. This patch improves the shared experience and gives unfinished kinds interactive fallback challenges; deeper unique mechanics should still be built and tested game-by-game.
- JavaScript syntax and archive integrity were checked. Please test the live GitHub Pages deployment in a browser before considering it fully verified.
