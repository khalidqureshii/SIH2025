import dotenv from "dotenv";
dotenv.config();
import express from "express";
import router from "./router/auth-router.js";
import { connectDB } from "./utils/db.js";
import errorMiddleware from "./middlewares/error-middleware.js";
import cors from "cors";
import weatherRoutes from "./router/weather.js";
import schemeRoutes from "./router/scheme.js";
import priceRoutes from "./router/price.js";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("🚀 Server is running successfully!");
});

app.use("/api/auth", router);
app.use("/api/weather", weatherRoutes);
app.use("/api/scheme", schemeRoutes);
app.use("/api/price", priceRoutes);
app.use(errorMiddleware);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at Port ${PORT}`);
  });
});
