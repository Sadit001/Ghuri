# Ghuri Travel Backend API

Production-ready, scalable Node.js & TypeScript Express backend for the **Ghuri Travel Application**.

## Features

- **Clean Layered Architecture**: Repositories, Services, Controllers, Routes, Validators.
- **Firebase Firestore Integration**: Uses Firebase Admin SDK with fallback mock Firestore engine when live credentials aren't provided.
- **JWT Authentication**: Secure user registration, login, token verification, session management.
- **Trip Builder API**: Trip itinerary creation, calculation, updates, and deletion.
- **Booking Engine**: Trip, guide, hotel, spot booking with availability check & anti-double-booking.
- **Tour Guides & Agencies**: Filter by division, specialization, language, price, reviews.
- **Feedback & Complaints**: Category feedback, image uploads, complaint tracking.
- **Preferences**: Theme & language state persistence.
- **Express Validator & Centralized Error Handling**: Validates requests and produces standardized JSON output.
- **Security & Performance**: Helmet, CORS, Rate Limiting, Compression, Morgan logging.

---

## Directory Structure

```text
backend/
├── src/
│   ├── config/          # Firebase Admin SDK & environment config
│   ├── constants/       # Status codes, collection names, API messages
│   ├── controllers/     # Route handlers & response formatting
│   ├── middleware/      # Auth, Error handling, Express validation, File upload
│   ├── models/          # Data schemas
│   ├── repositories/    # Firestore & database persistence layer
│   ├── routes/          # Express route definitions
│   ├── services/        # Business logic layer
│   ├── types/           # TypeScript interfaces & types
│   ├── utils/           # Helper functions (JWT, API response formatters, seed data)
│   ├── validators/      # Express validator rules
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── .env                 # Environment variables
├── package.json         # Node dependencies & npm scripts
└── tsconfig.json        # TypeScript configuration
```

---

## Getting Started

### Prerequisites

- Node.js >= v18.0.0
- npm >= 9.0.0

### Installation

```bash
cd backend
npm install
```

### Running Development Server

```bash
npm run dev
```

The API server will start at `http://localhost:5000`.

### Typecheck & Build

```bash
npm run typecheck
npm run build
npm start
```

---

## API Summary

- **Auth**: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- **Profile**: `GET /api/profile`, `PUT /api/profile`, `POST /api/profile/avatar`, `POST /api/profile/documents`, `GET /api/profile/preferences`, `PUT /api/profile/preferences`
- **Trips**: `GET /api/trips`, `POST /api/trips`, `GET /api/trips/:id`, `PUT /api/trips/:id`, `DELETE /api/trips/:id`, `POST /api/trips/calculate-cost`
- **Bookings**: `GET /api/bookings`, `POST /api/bookings`, `GET /api/bookings/:id`, `PATCH /api/bookings/:id/status`, `POST /api/bookings/:id/cancel`
- **Guides**: `GET /api/guides`, `GET /api/guides/:id`, `POST /api/guides/check-availability`, `POST /api/guides/book`, `POST /api/guides/:id/reviews`, `GET /api/agencies`
- **Destinations**: `GET /api/destinations`, `GET /api/destinations/:id`, `GET /api/hotels`
- **Feedback & Complaints**: `POST /api/feedback`, `POST /api/complaints`, `GET /api/complaints`, `PATCH /api/complaints/:id/status`
