# Gamers' arcade — Special 200 edition

A responsive static arcade using HTML, CSS and JavaScript. No build step, external libraries, remote images or fonts are required.

## What is special in this edition?
- 200 individually named challenge designs, each with its own objective and rule twist.
- 20 playable game families: Snake, Memory Matrix, Tactical Grid, Number Fusion, Paddle Duel, Brick Storm, Reflex Lab, Mind Games, Cipher Hunt, Target Rush, Mole Mayhem, Math Reactor, Type Blitz, Signal Sequence, Circuit Flip, Maze Runner, Meteor Dodge, Star Defender, Lane Runner and Minefield Logic.
- 10 challenge goals per family: starter, speedrun, precision, survival, combo, mirror, chaos, puzzle, endurance and boss.
- Search, filters, sorting, responsive neon interface, touch controls and keyboard controls where supported.

The 200 challenges are not 200 wholly independent game engines. They use 20 reusable game families and individually defined objectives/rules, keeping the download small. The 20 families have playable engines; challenge entries carry distinct objectives and several variants alter timers, target counts, board sizes, speed or difficulty. Some advanced goal conditions remain guidance rather than separately enforced game logic, so the collection should be treated as a strong playable beta and tested after publishing.

## Publish from a tablet
1. Create a public repository named `gamers-arcade` at https://github.com/new
2. Extract this ZIP on your tablet.
3. Upload these six files to the repository root: `index.html`, `styles.css`, `games-data.js`, `engine.js`, `app.js`, `README.md`.
4. Commit the changes.
5. Open Settings → Pages. Select Deploy from a branch, `main`, `/(root)`, then Save.
6. After deployment, visit `https://YOUR-USERNAME.github.io/gamers-arcade/`.

## Data budget
No external assets or libraries are downloaded. The setup archive is very small compared with 1 GB. Total data still includes the archive download, uploads, and testing visits.


## Challenge upgrade
This edition adds a visible challenge-rule card and several gameplay modifiers:
- Snake: reversed controls in the mirror challenge and fixed hazard blocks in later challenges.
- Target Tap: smaller targets and moving-target pressure in advanced variants.
- Mole Mayhem: increased scoring/penalties and shorter advanced rounds.
- Maze Runner: larger layouts in advanced challenges.
- Minefield Logic: larger boards and denser mine layouts in advanced challenges.

The 200 entries are 200 named challenges built on 20 reusable game families. This is a progressive upgrade, not a claim that every challenge has a completely separate engine.


## Personal Arcade Progression
- Favorite any challenge with the star button on its card.
- Filter the catalogue to Favorites.
- Recently played challenges can be brought to the top using the sort menu.
- The dashboard shows how many unique challenges have been opened and how many are favorited.
- Favorites and recent plays are stored locally in this browser using localStorage; they are not uploaded to a server.


## Achievements, completion and personal bests
- Six unlockable badges cover first play, exploration, favorites, completion, and score records.
- Players can mark a challenge complete from its play screen. Completion is user-confirmed rather than independently verified by every game engine.
- Score text is observed during play and the best detected score is saved per challenge.
- The dashboard reports completed challenges and the number of challenges with a personal best.
- All progression is stored locally in the browser. Clearing browser site data may reset it, and it does not sync between devices.


## Ultimate legacy + distinct-variant edition
This edition preserves the full 200-challenge catalogue from the previous versions: 20 game families with 10 entries each. Every entry has its own name, goal, variant rule, objective key, and difficulty tier. Variant rules are labelled Standard Objective, Time Attack, Precision Trial, Limited Attempts, Combo Chain, Mirror Mode, Hazard Survival, Key Objective, Endurance Run, and Boss Challenge. Gameplay is tuned across families where supported; the catalogue still uses 20 reusable game engines rather than 200 unrelated codebases.

### Achievements
The original six badges remain: First Steps, Arcade Explorer, Favorite Collector, Challenge Finisher, Arcade Champion, and Record Breaker. New harder badges include Deep Explorer (50 distinct challenges opened), Star Hoarder (25 favorites), Veteran Finisher (50 completed), Century Club (100 completed), Hard Mode Hero (10 hard challenges completed), Family Master (all 10 challenges in one family), All-Rounder (a completion in all 20 families), Score Hunter (personal bests in 25 challenges), Arcade Legend (150 completed), and Ultimate Completionist (all 200 completed).

Completion is still user-confirmed using the “Mark Challenge Complete” button; it is not automatically verified by every game's win state. Personal best detection uses the score text rendered by each game and therefore may not recognize every score format. Progress stays in local browser storage and does not sync between devices.


## Raunak Arcade merge — 330 challenge edition
This build preserves the previous 200-challenge catalogue and adds 130 Raunak Arcade challenges across 13 named families, each with ten separately named variants and ten distinct goal descriptions:
- Original Raunak games: Vector Pac-Man, Galactic Strike, Block Drop, Neon Racer, and Indian Bike Rush.
- Raunak Arcade starter games: Neon Snake, Memory Match, Reflex Rush, Tic-Tac-Toe, Number Hunter, Rock Paper Scissors, Target Tap, and 2048 Mini.

The five classic games have lightweight original browser implementations in the shared engine. The eight starter games use the corresponding existing game mechanics under their Raunak Arcade names. Variants include different goals, rule labels, and tuned difficulty/parameters where supported. This is 330 challenge entries across 33 reusable game families, not 330 separate codebases. Some objectives are guidance rather than independently enforced win checks; test the published site before treating every variant as fully distinct in mechanics.

The previous six achievements and all earlier hard achievements remain. Additional Raunak achievements are:
- Raunak Legacy Keeper: complete one challenge in each of the five classic games.
- Raunak Arcade Master: complete all 130 Raunak Arcade challenges.
- Legacy Explorer: complete at least one challenge in each of the 13 Raunak families.

All progression remains in local browser storage.
