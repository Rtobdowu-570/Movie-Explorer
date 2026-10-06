# MovieScope

MovieScope is a responsive film and television discovery app built with React, Vite and the TMDB API. Browse what is trending, find upcoming releases, search films by title, and explore detailed movie and series profiles.

## Features

- A featured film selected from trending titles, with its backdrop, rating and profile link
- Trending titles and upcoming releases on the home page
- A discovery catalogue for trending titles, popular films, upcoming releases and popular series
- Movie search with URL-based results at `/search?q=...`
- Movie and TV profiles with synopsis, ratings, cast, crew, videos, reviews and available production details
- Responsive layouts, loading skeletons, useful error and empty states, and keyboard-accessible controls

## Stack

- React 19 and Vite
- React Router 7
- React Icons
- Custom responsive CSS
- TMDB API

## Getting started

1. Install dependencies:
   ```bash
   npm ci
   ```
2. Create `.env.local` in the project root and add a TMDB API Read Access Token:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_read_access_token
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

Because `VITE_` variables are included in the browser bundle, use a TMDB read token intended for client-side use; never put a private server-side credential in this file. Restart the development server after changing the token.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build in `dist/`
- `npm run lint` — run ESLint
- `npm run preview` — serve the production build locally

## TMDB attribution

This product uses the TMDB API but is not endorsed or certified by TMDB. Movie data and images are provided by TMDB.
