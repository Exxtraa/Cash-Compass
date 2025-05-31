import express from "express" ;
import { sql } from "../config/db.js";
import {createTransaction, deleteTransaction, getSummaryByUserId, getTransactionsByUserId} from '../controllers/transactionsController.js'

const router = express.Router()

/// The information of user
router.get("/:userId", getTransactionsByUserId)

/// to delete the information of user
router.delete("/:id", deleteTransaction)

// To insert the data into 
router.post("/",createTransaction);

// To get the full summary of recieved and diduct of amount
router.get("/summary/:userId",getSummaryByUserId)

export default router;