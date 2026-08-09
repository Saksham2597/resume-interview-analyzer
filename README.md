# AI Resume & Interview Analyzer

An intelligent, full-stack web application that leverages Google's Gemini AI to analyze a candidate's resume and self-description against a target job description. It automatically generates personalized interview preparation strategies, mock questions, skill gap analysis, and even a tailored ATS-friendly PDF resume.

## ✨ Features

- **Personalized Interview Prep:** Generates a day-by-day preparation plan tailored to the user's specific skill gaps and the target job description.
- **AI Mock Questions:** Provides both technical and behavioral interview questions complete with intentions and suggested answering strategies.
- **Skill Gap Analysis:** Highlights missing skills in the candidate's profile with assigned severities (low, medium, high).
- **Tailored Resume Generation:** Uses AI and Puppeteer to dynamically generate and download a visually appealing, 1-2 page, ATS-friendly PDF resume tailored directly to the target job description.
- **User Authentication:** Secure JWT-based authentication system with HTTP-only cross-site cookies.
- **History Tracking:** Saves all past generated interview reports to the user's dashboard for future reference.

## 🚀 Tech Stack

### Frontend
- **React.js (Vite):** Fast, modern frontend framework.
- **SCSS:** Advanced styling for a clean, professional, and responsive user interface.
- **Axios:** HTTP client for robust API communication.
- **React Router:** Client-side routing.

### Backend
- **Node.js & Express.js:** Scalable backend server architecture.
- **MongoDB & Mongoose:** NoSQL database and object data modeling.
- **Google Gen AI SDK (Gemini):** Advanced LLM integration for analyzing text and returning structured JSON outputs.
- **Puppeteer & @sparticuz/chromium:** Headless browser integration for dynamic HTML-to-PDF resume generation, optimized for serverless/Linux environments.
- **PDF-Parse:** Extracts text data from uploaded resume PDFs.
- **JWT & Bcrypt:** Secure authentication and password hashing.

## 🛠️ Local Development Setup

### Prerequisites
- Node.js (v18+)
- MongoDB connection string
- Google Gemini API Key

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` directory with the following variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GOOGLE_GENAI_API_KEY=your_gemini_api_key
   CLIENT_URL=http://localhost:5173
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Frontend` directory with the following variables:
   ```env
   VITE_API_URL=http://localhost:3000
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```

## 📦 Deployment (Render)

This project is optimized for deployment on [Render](https://render.com). 

**Backend Configuration:**
- Create a new Web Service using the `Backend` directory.
- Build Command: `npm install`
- Start Command: `node server.js`
- Ensure all environment variables (including `CLIENT_URL`) are set in the Render Dashboard.
- Puppeteer relies on `@sparticuz/chromium` which downloads the necessary Chromium binaries for PDF generation in Linux environments.

**Frontend Configuration:**
- Create a new Static Site using the `Frontend` directory.
- Build Command: `npm run build`
- Publish Directory: `dist`
- Set the `VITE_API_URL` environment variable to your deployed backend URL.

## 📄 License

This project is open-source and available under the ISC License.
