const express = require("express");
const { transactionCreateController } = require("../controller/transactionController");

const router = express.Router();

router.post("/create",transactionCreateController)

module.exports = router