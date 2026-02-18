import express from "express";
import { allocateProfit } from "../controllers/profitController.js";

const router = express.Router();

router.post("/allocate", allocateProfit);

export default router;
