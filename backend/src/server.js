import express from "express";
import taskRoute from "./routes/taskRoute.js";
import { connectDB } from "./config/db.js";
import { configDotenv } from "dotenv";
import cors from "cors";
const app = express();
configDotenv();
const PORT = process.env.PORT || 2204;
app.use(cors({origin: 'http://localhost:3000'}));
connectDB();
app.get("/", (req, res) => {
    const API = {
        name: "TodoX",
        version: "1.0.0",
        description: "A simple todo list API",
        url: "http://localhost:2205"
    }
    res.status(200).json(API);
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/tasks", taskRoute);
app.listen(PORT, () => {
  console.log("\x1b[32m%s\x1b[0m","Server is running on port " + PORT);
});