import express from "express";
import { translateText } from "../controller/translateController.js";

const router = express.Router();

router.post("/translate", translateText);

export default router;
