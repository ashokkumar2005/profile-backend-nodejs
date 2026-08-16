# Ashokkumar T — Portfolio Backend (Phase 2)

Express + MongoDB API powering the admin dashboard: authentication, content
CRUD, image uploads, and the contact form.

## Stack

Node.js (ESM) · Express · MongoDB / Mongoose · JWT (`jsonwebtoken`) ·
`bcryptjs` · Multer (memory storage) · Cloudinary · Helmet · Morgan · CORS

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create your `.env`** from the template and fill in real values:
   ```bash
   cp .env.example .env
   ```
   You'll need:
   - A MongoDB Atlas cluster → connection string for `MONGODB_URI`
   - A Cloudinary account (free tier is fine) → cloud name, API key, API secret
   - A long random string for `JWT_SECRET` (e.g. `openssl rand -hex 32`)

3. **Create your admin login.** Set `ADMIN_USERNAME` and `ADMIN_PASSWORD` in
   `.env`, then run:
   ```bash
   npm run seed:admin
   ```
   This hashes the password and stores it in MongoDB — the plaintext value
   is never saved. Remove those two lines from `.env` afterwards.

4. **(Optional) Seed starting content** — migrates the resume-derived data
   into MongoDB so the dashboard isn't empty on first login:
   ```bash
   npm run seed:content
   ```

5. **Run the API**
   ```bash
   npm run dev     # auto-restarts on file changes
   npm start        # production
   ```
   Defaults to `http://localhost:5000`.

## API overview

All routes are prefixed with `/api`.

| Resource | Public | Admin (Bearer token) |
|---|---|---|
| `POST /auth/login` | ✅ | — |
| `GET /auth/me` | — | ✅ |
| `GET /profile` | ✅ | — |
| `PUT /profile` | — | ✅ |
| `GET/POST/PUT/DELETE /skills` | GET only | write |
| `GET/POST/PUT/DELETE /projects` | GET only | write |
| `GET/POST/PUT/DELETE /education` | GET only | write |
| `GET/POST/PUT/DELETE /achievements` | GET only | write |
| `GET/POST/PUT/DELETE /certifications` | GET only | write |
| `GET/POST/PUT/DELETE /testimonials` | GET only | write |
| `POST /contact` | ✅ | — |
| `GET/PATCH/DELETE /contact` | — | ✅ |
| `POST /upload` (multipart `image` field) | — | ✅ |
| `GET /health` | ✅ | — |

Admin routes expect `Authorization: Bearer <token>`, where the token comes
from `POST /auth/login`.

## Project structure

```
config/        MongoDB + Cloudinary setup
controllers/   Route logic, including a generic CRUD factory reused by
               every content resource (skills, projects, education, etc.)
middleware/    JWT auth guard, centralized error handling
models/        Mongoose schemas
routes/        Express routers, including a generic resource-router builder
seed/          One-time scripts: create admin login, migrate starter content
utils/         JWT signing helper
```

Because every content resource (skills, projects, education, achievements,
certifications, testimonials) shares the same shape, `crudFactory.js` and
`resourceRoutes.js` generate their controllers/routers instead of repeating
near-identical code six times. Adding a new resource is: define the model,
then one line in `routes/index.js`.

## Deploying to Render

1. Push this folder to its own GitHub repo (or a `backend/` subfolder).
2. New Web Service on Render → connect the repo.
3. Build command: `npm install` — Start command: `npm start`
4. Add all `.env` variables in Render's Environment settings.
5. After the first deploy, run `npm run seed:admin` locally pointed at the
   same `MONGODB_URI` (or via Render's shell) to create your login.

## What's NOT tested end-to-end here

I don't have a live MongoDB or Cloudinary account in this environment, so I
verified the server boots, loads every route, and fails cleanly on a bad DB
connection — but I could not run the full request/response cycle against a
real database. Test each endpoint with Postman/Thunder Client once you've
filled in real credentials, starting with `POST /auth/login`.
