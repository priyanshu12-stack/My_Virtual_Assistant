import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";

const app = express();


const allowedOrigins = [
  "https://my-virtual-assistant-seven.vercel.app", 
  "http://localhost:5173"
];

app.use(
  cors({
    origin: function (origin, callback) {
   
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS policy: Origin not allowed"));
    },
    credentials: true, 
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  connectDb();
  console.log(`Server running on port ${port}`);
});
