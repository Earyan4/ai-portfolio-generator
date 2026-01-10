import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import resumeRouter from "./routes/resume.routes.js";
import cors from "cors";
import { config } from "dotenv";
config();

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());


app.use(
  cors({
    origin: [
      "https://ai-portfolio-generator1.netlify.app",
    ],
    credentials: true,
  })
);




app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);

export default app;
