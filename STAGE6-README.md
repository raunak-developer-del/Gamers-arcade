# Gamers’ Arcade — Stage 6 cumulative development build

This ZIP carries forward the Stage 5 cumulative package and adds the available individual numbered game pages plus a manifest and static QA utility. This revision fixes missing homepage assets and several incorrect root-level library links.

## Included
- Stage 1–5 cumulative files already present in Stage 5 package (homepage, profile, difficulty helper, catalogue JSON/HTML, leaderboard page, Supabase scaffolding, and stage notes).
- `games/game-001.html`-style numbered pages from the available 500-page game pack (actual count listed in `stage6-game-manifest.json`).
- `candy-crush.html` and game extras where available.
- `stage6-static-qa.py` for checking exact duplicate visible titles and basic interactive markers.
- `stage6-game-manifest.json` documenting the current inventory and honest verification status.

## Important status
This is the **first Stage 6 development build**, not a claim that the final acceptance criteria have been met. File count and separate HTML pages do not prove 500 unique game mechanics. The exact-title QA utility is not a semantic duplicate detector, and browser testing has not been performed here. The Supabase leaderboard remains unconfigured until project credentials and deployment are supplied by the site owner.

## Safe use
1. Keep your current GitHub Pages files unchanged.
2. Download and extract this ZIP locally first.
3. Review `BUILD-STATUS.md` and this file before copying anything to GitHub.
4. Run `python stage6-static-qa.py` on a computer with Python to inspect exact duplicate titles.

## Next Stage 6 work
- Audit game mechanics individually, merge only verified distinct games, and replace any clones.
- Test touch, keyboard, scoring, restart, victory/defeat, and responsive layout in a browser.
- Integrate the catalog with a stable gallery without breaking original Pac-Man/Candy Cascade or GoatCounter.
- Configure and test leaderboard authentication/server-side score validation before presenting it as live.


## QA results for fixed build
- Static local-reference scan: 0 missing local references.
- 500 numbered pages and 500 distinct visible titles detected.
- The pages currently use 20 shared mechanic families (25 pages per family); therefore, the requirement for 500 genuinely unique games is not met yet.
- Browser testing and live leaderboard setup remain pending. See `STAGE6-BUILD-STATUS.md`.
