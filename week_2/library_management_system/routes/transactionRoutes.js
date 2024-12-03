const express = require("express");
const { createTransaction, history } = require("../controllers/transactionController");
const router = express.Router();

//get requests
router.get("/history", history);


router.post("/create-transaction/:bookId", createTransaction)


module.exports = router;