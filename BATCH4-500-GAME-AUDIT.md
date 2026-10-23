# Batch 4 — 500-game build status

## Included
- 500 separate HTML game pages: `games/game-001.html` through `games/game-500.html`.
- 500 unique page titles and 500 unique game configuration seeds/rule signatures.
- 50 distinct interaction families, with 10 rule variants each.
- Searchable catalogue at `batch4-games.html`.
- Shared runtime and stylesheet to reduce download size and keep fixes consistent.
- Previous cumulative files, including original `pacman.html`, `candy-crush.html`, profile, leaderboard, assets, and prior stage pages, are retained in this archive.
- Homepage link to the Batch 4 catalogue added.

## Important accuracy note
This is a large cumulative **development build**, not a claim that all 500 entries have passed full manual gameplay testing. The 500 entries have unique titles, seeds, and variant rule parameters; they are organized into 50 interaction families, so interaction genres do recur. Some runtime modes are simplified prototypes and need additional gameplay polish. The international leaderboard remains dependent on configuring its backend. Do not replace the live site until you have tested the package.

## QA performed by the build script
- Exactly 500 numbered game HTML files present.
- 500 unique titles.
- 500 unique config seeds.
- Every numbered page points to `../batch4-games.css` and `../batch4-runtime.js`.
- Internal catalogue links point to existing pages.
- ZIP integrity checked after packaging.
- JavaScript syntax should be checked in a browser / Node environment before publication; this archive is not a substitute for manual Chrome testing.

## Build-time results
- Numbered game pages found: 500
- Unique page titles: 500
- Unique (title, interaction family, seed, variant) signatures: 500
- Missing relative references inside numbered pages: 0
- Node syntax check for shared runtime: PASS
