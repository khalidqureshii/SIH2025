import express from "express";
import { getWeatherAdvisory } from "../controller/weatherController.js";

const router = express.Router();

router.get("/advisory", getWeatherAdvisory);

export default router;
