import express from "express";
import Investment from "../models/Investment.js";
import { addInvestment,getInvestments,updateInvestment,
  deleteInvestment } from "../controllers/investmentController.js";

const router = express.Router();

router.post("/", addInvestment);
router.get("/", getInvestments);
router.put("/:id", updateInvestment);   // ✅ edit
router.delete("/:id", deleteInvestment); // ✅ delete

export default router;