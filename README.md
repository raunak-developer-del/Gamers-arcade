# Gamers’ Arcade — Production Polish Pass 3

This is a patch for the existing GitHub Pages site. It upgrades navigation, browsing, player feedback, sharing, and launch UX without replacing the 500-game catalogue or standalone Pac-Man / Candy Cascade files.

## Included files
- `index.html` — SEO metadata, play-time filter, achievement-card action, lazy-render sentinel, recommended games, and embedded game modal.
- `app.js` — OS-specific shortcut, play-time chips and filtering, IntersectionObserver-based card batches, recommendations, modal launching, and XP toast on return.
- `styles.css` — cohesive card-thumbnail template, responsive duration chips, recommendations, modal, and progressive-render styling.
- `play.html` — avoids writing duplicate return-to-dashboard toast data when embedded in the modal.
- `achievement-card.js` — generates a downloadable PNG achievement card with native Canvas; no third-party `html2canvas` CDN is required.
- `service-worker.js`, `manifest.webmanifest`, `arcade-icon.svg` — versioned offline cache and installable app metadata.
- `microgames.js`, `profile.js` — carried forward from the existing polish patch.

## Install
1. Commit or back up your current repository first.
2. Extract this ZIP.
3. Upload and replace the matching included files in the same folder as `games-data.js`.
4. Keep your existing `games-data.js`, `pacman.html`, `candy-crush.html`, and `engine.js` unchanged.
5. Commit changes, wait for GitHub Pages to deploy, then hard-refresh with Ctrl+Shift+R.

## What changed
- Suggested session-time chips: Quick Run, Challenge, Endless. These are heuristics based on a game's title/category/kind, not measured play-session telemetry.
- When filters return no results, the page offers category shortcuts, three locally personalized/featured recommendations, and Show all games.
- Shortcut label displays `⌘ + K` on Mac-like user agents and `Ctrl + K` elsewhere.
- Games launch in an in-page modal iframe with a persistent Back to Arcade Dashboard header. The iframe permits scripts and same-origin access so the existing local profile and save logic continue to work; only trusted same-origin game pages should be embedded this way.
- Player can download an achievement-card PNG showing local level, XP, badge count, and games discovered. It uses native Canvas rather than loading an external html2canvas library.
- Game cards render in batches of 36 using IntersectionObserver. The current `games-data.js` file still loads the 500 lightweight metadata records up front; only card DOM creation is lazy. Full data-file code splitting is a separate migration.
- SEO tags include canonical URL, robots, Open Graph, Twitter summary, description, and theme color for the GitHub Pages subfolder.
- The card thumbnails use a single CSS-generated design template, so no mismatched external screenshots are loaded.

## Media optimization note
The patch does not contain a library of audio or raster thumbnails to transcode. The card art is generated with CSS and the app icon is SVG. If audio or image assets are added later, use compressed Ogg/WebM and WebP/SVG where browser support and visual quality allow.

## Validation
JavaScript syntax and ZIP integrity were checked. Please test the live deployment in a browser, especially iframe gameplay, touch controls, saved XP, service-worker updates, and offline loading. Suggested play-time labels are estimates, not guaranteed durations. The catalogue still contains lightweight prototypes rather than 500 fully bespoke games.
