# Gamers’ Arcade — UX Polish Pass 2

This patch targets the current ecosystem-upgrade version of the site. It does not replace `pacman.html`, `candy-crush.html`, `games-data.js`, or `engine.js`.

## Improvements

- Empty search/filter states now offer recommended categories and a **Show all games** action.
- Search shortcut hint detects Mac-like user agents (`⌘ + K`) and otherwise displays `Ctrl + K`; both Ctrl+K and Command+K continue to work.
- Returning to the arcade from a game shows a one-time toast for XP gained or the saved session.
- The profile refreshes from local storage when the homepage is restored from browser back/forward cache, so XP and played counts update correctly.
- Keeps the current simulation-enhanced `microgames.js` implementation from the existing project.

## Install

1. Back up your repository first.
2. Upload and replace only these six files from the ZIP: `index.html`, `styles.css`, `app.js`, `play.html`, `microgames.js`, and `profile.js`.
3. Keep `games-data.js`, `engine.js`, `pacman.html`, and `candy-crush.html` unchanged.
4. Commit the changes, wait for GitHub Pages to publish, then hard-refresh with Ctrl+Shift+R (on Mac: Cmd+Shift+R).

## Validation performed

JavaScript syntax checks and ZIP integrity checks were run locally. The live GitHub Pages deployment and cross-browser UI still need to be tested in a real browser. XP and profile storage remain local to each browser; this does not add server-backed accounts or global leaderboards.
