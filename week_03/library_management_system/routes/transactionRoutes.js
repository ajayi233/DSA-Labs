const express = require("express");
const { createTransaction, history, userHistory } = require("../controllers/transactionController");
const router = express.Router();

//get requests
router.get("/history", history);
router.get('/user-history', userHistory)


router.post("/create-transaction/:bookId", createTransaction)


module.exports = router;