import express from "express";
import { getWeatherAdvisory } from "../controller/weatherController.js";

const router = express.Router();

// @route   GET /api/weather/advisory
// @desc    Get 7-day weather forecast + crop advisory
// @access  Public
router.get("/advisory", getWeatherAdvisory);

export default router;
