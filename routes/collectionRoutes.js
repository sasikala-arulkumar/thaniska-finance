import express from "express";
import {
  addCollection,
  getLedgerByParty,
   getCollectionByDate,
   getAllCollections
} from "../controllers/collectionController.js";

const router = express.Router();

router.post("/", addCollection);
router.get("/ledger/:partyName", getLedgerByParty);
router.get("/report", getCollectionByDate);
router.get("/", getAllCollections);


export default router;
