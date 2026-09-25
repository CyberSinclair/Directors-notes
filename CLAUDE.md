# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

"Short Film Programme Builder" for a fictional cinema (Creative Processes Cinema), built as a bootcamp exercise. Users browse short films, filter by award status/category, and pick films for a single screening programme with a 30–45 minute combined-runtime target.

The repo has two parts:

- `app/` — the active React 19 + Vite app. All development happens here.
- `src/` (repo root) — the original static HTML/CSS mockup (`src/index.html`, `src/styles/style.css`) that the React app was ported from. Treat it as reference for markup and class names; it is not built or served by Vite.

## Commands

Run from `app/`:

```sh
npm install
npm run dev       # Vite dev server with HMR
npm run build     # production build to app/dist
npm run preview   # serve the production build
npm run lint      # oxlint (config: app/.oxlintrc.json — react + oxc plugins)
```

There is no test framework configured.

## Architecture

- `app/src/main.jsx` mounts `<App />` and imports the global stylesheet `styles/style.css` (ported from the root static mockup). `App.css` is Vite template leftover and is not imported.
- `App.jsx` owns all state and passes it down as props: `selectedFilter` (`"all" | "winner" | "nominated"`), `categoryFilters` (array of award `name`s; empty = all, several = union), and `programmeIds` (ids of films added to the programme, toggled from cards in both the carousel and the grid; persisted to `localStorage` under `programmeIds`). There is no router, context, or state library.
- Data is static JS modules in `app/src/data/`:
  - `films.js` — large generated dataset of fictional films. Each film has `synopsis`, `runtimeSeconds` (`null` for 15 films — shown as "Runtime not recorded"), `rating` (UK-style: `U`, `PG`, `12A`, `15`), `published` (the carousel shows the 10 most recent), `genres[]`, `directors[]` (objects), `poster` (path relative to `app/public`, e.g. `images/film-001.svg`), and `honours[]`.
  - `awards.js` — award definitions (`id`, `name`, `category`, `description`).
  - Linking: `film.honours[].bodyId` references either an award `id` (`award-xxx`, `bodyType: "Award"`) or a festival (`festival-xxx`, `bodyType: "Festival"`). Every film has at least one `Award` honour, and each award is referenced by 15 films (5 each of `Winner`, `Nominated`, `Shortlisted`), so every award/status filter combination has films. `honours[].result` is one of `Winner`, `Nominated`, `Shortlisted`, `Longlisted`, `Special Mention`, `Official Selection`.
- Components (`app/src/components/`): `FilmCard` is the shared presentational card used by both `LatestFilms` (carousel) and `FilmCollection` (filtered grid); `AwardLegend` renders the filter buttons that set App state.
- Filtering lives in `app/src/utils/filterFilms.js`. `app/src/utils/awardHonours.js` turns a film's award wins/nominations into the badge data `FilmCard` renders (it needs `awards` to resolve names, so both card lists receive it). Runtime totals and display (minutes up to 120, then hours) live in `app/src/utils/formatRuntime.js`. `FilmCollection` shows the count/runtime of both the filtered films and the programme; the 30–45 minute target message is based on the programme.
