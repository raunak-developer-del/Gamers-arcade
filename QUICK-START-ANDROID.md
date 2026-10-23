# Gamers' Arcade — Quick Start

## Fastest safe way to publish

1. Download and extract `gamers-arcade-quick-launch.zip` on a computer if possible.
2. Open your GitHub repository: https://github.com/raunak-developer-del/Gamers-arcade
3. Before changing anything, download a ZIP backup of the current repository.
4. Upload the extracted website files and folders to the repository's main branch, preserving folder paths. Do not upload the outer `gamers-arcade-stage6` folder as a nested folder unless you intend the site to live in that subfolder.
5. Commit the changes. Wait for GitHub Pages to publish, then open https://raunak-developer-del.github.io/Gamers-arcade/ and hard-refresh.

## Important limitations

- This package is a development build. Syntax and archive checks do not prove every game has been fully playtested.
- The catalogue contains the 100-game milestone structure, but do not advertise all 100 as fully verified until you test them in Chrome.
- International rankings require your own Supabase project, database schema, and secure score-submission function. Until then, the page must show setup required, not live world rankings.
- GoatCounter requires replacing `YOUR-GOATCOUNTER-CODE` in `index.html` with your real site code.
- Keep the old repository backup. This ZIP does not change the live website automatically.

## What's inside

- `index.html`: homepage, profile/XP display, achievements, game catalogue and quick links.
- `part1-games.html`, `part2-games.html`, `part3-games.html`: stage catalogues.
- `profile.html`, `leaderboard.html`: profile and leaderboard setup pages.
- `pacman.html`, `candy-crush.html`: preserved original games.
- `games/`: game pages and batches.
- `service-worker.js`, `manifest.webmanifest`: offline/PWA support for the hosted website.
