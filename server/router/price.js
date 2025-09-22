import express from "express";
import { getCommodityPrice } from "../controller/priceController.js";
const router = express.Router();
router.get("/getPrice", getCommodityPrice);
export default router;
