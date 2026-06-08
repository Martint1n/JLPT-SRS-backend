# JLPT-SRS — Backend

REST API for a Japanese language learning app using a Spaced Repetition System (SRS).
Built to help French speakers progress through JLPT levels (N5 → N3).

## Tech Stack
- **Runtime** : Node.js
- **Framework** : Express.js
- **ORM** : Prisma
- **Database** : PostgreSQL (Neon)

## Features (Phase 1)
- Hiragana / Katakana flashcard system
- SRS algorithm for optimized review scheduling
- JWT Authentication
- RESTful API

## Prerequisites
- Node.js v18+
- A Neon account (or any PostgreSQL database)

## Installation
1. Clone the repo
   git clone https://github.com/ton-username/JLPT-SRS-backend.git
2. Install dependencies
   npm install
3. Set up environment variables
   cp .env.example .env
   Then fill in your DATABASE_URL in .env
4. Run migrations
   npx prisma migrate dev
5. Start the server
   npm run dev

## Project Roadmap
- [x] Phase 1 — Express + Prisma + PostgreSQL + JWT Auth
- [ ] Phase 2 — Dockerize the app
- [ ] Phase 3 — CI/CD with GitHub Actions
- [ ] Phase 4 — AWS deployment (EC2 + RDS)