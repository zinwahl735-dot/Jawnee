# Jawnee — Web scaffold

This branch contains a minimal React + TypeScript (Vite) scaffold for the Jawnee frontend.

What I added (branch: scaffold/web-typescript)
- Vite + React + TypeScript setup
- Components: LessonsList, UploadVideo, ClubFinder
- Basic styles and README

How to run locally
1. Clone the repo and check out the branch:

   git fetch origin scaffold/web-typescript
   git checkout scaffold/web-typescript

2. Install dependencies:

   npm install

3. Run the dev server:

   npm run dev

Open the URL printed by Vite (usually http://localhost:5173).

Notes & next steps
- This frontend expects a backend implementing the following endpoints:
  - POST /api/upload/presign    (returns { uploadUrl, key, publicUrl })
  - POST /api/lessons           (accepts { title, videoKey })
  - GET  /api/lessons           (returns list of lessons)
  - GET  /api/clubs/search?lat=&lng=&radius_km=

- I can scaffold a minimal TypeScript Express API (presign + lessons + clubs) next and push it in the repo if you want.

