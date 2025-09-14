import dotenv from "dotenv";
dotenv.config();
import express from "express";
import router from "./router/auth-router.js";
import {connectDB} from "./utils/db.js"
import errorMiddleware from "./middlewares/error-middleware.js";
import cors from "cors";

import weatherRoutes from "./router/weather.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", router);
app.use("/api/weather", weatherRoutes);
app.use(errorMiddleware);

connectDB().catch((err) => {
  console.error("DB connection failed:", err);
});

// 👇 Export instead of listen()
export default app;