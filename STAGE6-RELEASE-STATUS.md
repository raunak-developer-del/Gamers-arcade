# Stage 6 build — release candidate status

This package is cumulative and safer to test, but it is **not yet the final acceptance build** for the strict 500-unique-games requirement.

## Included in this candidate
- Cumulative Stage 1–5 files and 500 individual numbered HTML game pages.
- Existing neon cyan/purple arcade UI, original Pac-Man and Candy Cascade pages, profile, achievement-card UI, catalogue and leaderboard/Supabase scaffold.
- Local service worker for offline caching after the homepage is opened on the hosted HTTPS site and caching completes.
- Static QA and uniqueness audit reports.

## Verified static checks
- 500 numbered game pages and 500 distinct visible titles.
- Inline JavaScript syntax check passed for the numbered pages in the prior audit.
- ZIP integrity and local reference scan passed in the prior audit.

## Still not passed — do not misrepresent these
- The current 500 pages use 20 shared mechanic families, with 25 variants per family. This does not meet the requested zero-duplicate-core-gameplay standard.
- Actual browser gameplay across all 500 pages has not been completed. Automated Chromium smoke testing was inconclusive in the previous environment.
- International leaderboard is a scaffold, not live, until Supabase credentials, schema, and server-side validation are configured and deployed.
- Offline cache behavior must be verified on the hosted HTTPS site; opening local HTML files does not enable service workers.
- The live GitHub Pages site has not been changed.

## Safe test instructions
1. Keep the live repository untouched.
2. Extract the ZIP into a new folder and review `STAGE6-README.md` and this file.
3. For PWA/offline testing, deploy to a separate GitHub branch or test repository first, then open the hosted homepage in Chrome and allow caching to finish.
4. Test touch and keyboard controls, restart, scoring, win/loss, Pac-Man, Candy Cascade, profile and leaderboard before promoting anything to the live site.
