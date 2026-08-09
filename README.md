# AI Interview Prep Assistant

An AI-powered platform that analyzes your resume against a target job
description, identifies skill gaps, generates personalized interview
questions and preparation plans, and creates a tailored ATS-friendly resume.

Upload your resume → paste the job description → get a personalized
interview strategy and optimized resume.

Built as a full-stack MERN-style application: a React (Vite) frontend and a Node/Express backend, powered by Google's Gemini API for report and resume generation.

## Why I Built This

Interview preparation often requires manually comparing a resume against a job description and figuring out what to study next.

I built this platform to automate that process using structured LLM output, while keeping the application fully personalized to the candidate's resume and target role.

## Highlights

- 🤖 Personalized interview preparation using Gemini
- 📄 Resume parsing and ATS-friendly resume generation
- 🔐 JWT authentication with HTTP-only cookies
- 📊 Structured AI-generated interview reports
- 🗄️ Persistent report history with MongoDB
- 🖥️ React + Express full-stack architecture
- 🚀 Deployed with Vercel + Render + MongoDB Atlas

**Live app:** https://resume-interview-analyzer-ui.onrender.com
**API:** https://resume-interview-analyzer.onrender.com

---

## Features

- **User authentication** — register/login with JWT stored in an HTTP-only cookie, plus a token blacklist on logout.
- **AI interview report generation** — upload a resume (PDF), job description, and self-description; Gemini returns a structured report:
  - Match score (0–100) against the job description
  - Technical questions, with interviewer intention and how to answer
  - Behavioral questions, with interviewer intention and how to answer
  - Skill gaps with severity (low / medium / high)
  - A day-by-day preparation plan
- **Report history** — view all past interview reports for the logged-in user.
- **AI resume generation** — generate a tailored, ATS-friendly resume (rendered from HTML to PDF via Puppeteer) based on the same inputs.
- **Protected routes** on the frontend, gated behind authentication.

## Tech Stack

**Backend**
- Node.js + Express 5
- MongoDB Atlas + Mongoose
- Google Gen AI SDK (`@google/genai`, Gemini models) with Zod schemas for structured JSON output
- JWT auth (`jsonwebtoken`) + `bcryptjs` for password hashing
- `multer` for resume (PDF) uploads, `pdf-parse` for text extraction
- `puppeteer` for HTML → PDF rendering of generated resumes
- Deployed on **Render** (chosen for native Puppeteer/Chromium support)

**Frontend**
- React 19 + Vite
- React Router 7
- Axios for API calls
- Sass (SCSS) for styling
- Deployed on **Vercel**

## Project Structure

```
resume-interview-analyzer/
├── Backend/
│   ├── server.js                  # entry point, connects DB, starts server
│   └── src/
│       ├── app.js                 # Express app setup, middleware, routes
│       ├── config/database.js     # MongoDB connection
│       ├── controllers/           # auth & interview controllers
│       ├── middlewares/           # JWT auth guard, multer file upload
│       ├── models/                # User, InterviewReport, token blacklist
│       ├── routes/                # /api/auth, /api/interview
│       └── services/ai.service.js # Gemini prompts & PDF generation
└── Frontend/
    └── src/
        ├── app.routes.jsx         # route definitions
        └── features/
            ├── auth/               # login/register pages, auth context, API calls
            └── interview/          # home, interview report pages, API calls
```

## API Overview

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Log in with email/password |
| GET | `/api/auth/logout` | Public | Clear auth cookie, blacklist token |
| GET | `/api/auth/get-me` | Private | Get current logged-in user |
| POST | `/api/interview/` | Private | Generate an interview report (resume PDF + job description + self-description) |
| GET | `/api/interview/` | Private | Get all interview reports for the logged-in user |
| GET | `/api/interview/report/:interviewId` | Private | Get a specific interview report |
| POST | `/api/interview/resume/pdf/:interviewReportId` | Private | Generate and download a tailored resume PDF |

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A MongoDB instance (local or Atlas)
- A Google Gemini API key ([Google AI Studio](https://aistudio.google.com/))

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/`:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:5173
```

Run the dev server:

```bash
npm run dev
```

The API runs on `http://localhost:3000`.

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Create a `.env` file in `Frontend/` pointing at your backend:

```
VITE_API_URL=http://localhost:3000
```

The app runs on `http://localhost:5173` (the backend's CORS config expects this origin in development).

## Deployment

This project is deployed as three independent services:

| Layer | Platform | Notes |
|---|---|---|
| Frontend | Vercel | Static build of the Vite app |
| Backend | Render | Chosen over serverless platforms for native Puppeteer/Chromium support |
| Database | MongoDB Atlas | Managed cluster |

When deploying, make sure:
- The backend's CORS origin is set to the deployed frontend URL (not `localhost`).
- The frontend's `VITE_API_URL` points to the deployed backend URL.
- Environment variables (`MONGO_URI`, `JWT_SECRET`, `GOOGLE_GENAI_API_KEY`) are set in Render's dashboard, not committed to the repo.

## Notes

- Resume uploads are capped at 3MB and processed in memory (not written to disk).
- Generated resume PDFs are produced by rendering AI-generated HTML through Puppeteer, so a Chromium download happens as part of `npm install` in `Backend/`.
