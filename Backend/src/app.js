const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());

// Allow origins configured via process.env.CLIENT_URL, production Render UI, and local dev
const allowedOrigins = [
    process.env.CLIENT_URL,
    "https://resume-interview-analyzer-ui.onrender.com",
    "http://localhost:5173",
    "http://localhost:4173",
    "http://localhost:3000"
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps, Postman, or server-to-server)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || (typeof origin === "string" && origin.endsWith(".onrender.com"))) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
}));
/* require git push origin mainall the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)



module.exports = app