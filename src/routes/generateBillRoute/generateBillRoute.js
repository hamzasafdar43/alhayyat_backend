const express = require("express");
const { generateBillController } = require("../../controller/generateBill/generateBill");
const router = express.Router();


router.post("/generate-bill" , generateBillController)


module.exports = router;