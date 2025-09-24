import express from "express";
import { getSchemesByState } from "../controller/schemeController.js";

const router = express.Router();

router.get("/getScheme", getSchemesByState);

export default router;
