import express from "express";
import taskRoute from "./routes/taskRoute.js";
import { connectDB } from "./config/db.js";
import { configDotenv } from "dotenv";
import path from "path";
import cors from "cors";
import next from "next";

configDotenv();

const PORT = process.env.PORT || 2205;
const dev = process.env.NODE_ENV !== "production";

const dir_name = path.resolve();
const nextApp = next({
  dev,
  dir: path.join(dir_name, "../frontend"),
});

const handle = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
  const app = express();

  // CORS chỉ dùng khi dev
  if (dev) {
    app.use(cors({ origin: "http://localhost:3000" }));
  }

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API routes
  app.use("/api/tasks", taskRoute);

  // Route test API root
  app.get("/api", (req, res) => {
    res.status(200).json({
      name: "TodoX",
      version: "1.0.0",
      description: "A simple todo list API",
    });
  });

  // Tất cả route còn lại cho Next xử lý
  app.all("*", (req, res) => {
    return handle(req, res);
  });

  await connectDB();

  app.listen(PORT, () => {
    console.log(
      "\x1b[32m%s\x1b[0m",
      "Server is running on port " + PORT
    );
  });
});