# The Hub

The Hub is a modern web app that lets users create, manage, and share movie watchlists. Whether you're curating your favorite films or exploring what others are watching, The Hub offers a seamless and social way to organize and discover movies.

Built using React, Supabase, and the OMDB API, the app delivers real-time updates, secure data handling, and a clean user experience.

---

## Features

- User sign-up and login via Supabase Auth
- Create and manage personalized watchlists
- Shareable watchlist links
- Real-time database syncing
- Movie search and data powered by the OMDB API
- Route-based navigation using React Router
- Secure data access with Row-Level Security (RLS)
- Notifications using custom toast components
- Deployed via Vercel

---

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Routing:** React Router
- **Data Fetching & Caching:** React Query
- **Backend:** Supabase (PostgreSQL, Auth, RLS)
- **API:** OMDB API for movie data
- **Hosting:** Vercel

---

## Project Structure

The app uses the following routes as defined in `App.tsx`:

- `/` – Home page
- `/search` – Movie search interface
- `/movie/:id` – Individual movie detail view
- `/auth` – Authentication (login/signup)
- `/my-watchlists` – User's saved watchlists
- `/create-watchlist` – Create a new watchlist
- `/watchlist/:id` – Watchlist detail and movie management
- `/my-account` – Account settings
- `*` – 404 Not Found

---



