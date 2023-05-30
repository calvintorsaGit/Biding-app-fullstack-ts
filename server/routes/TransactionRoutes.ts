import express from 'express';
import {createItem, deposit} from "../controllers/TransactionControllers";

const router = express.Router();

router.post("/deposit", deposit);
router.post("/createItem", createItem);

export default router;
