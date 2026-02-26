const express = require("express");
const { generateBillController } = require("../../controller/generateBill/generateBill");
const UserAuthenication = require("../../middleware/UserAuthenication");
const router = express.Router();


router.post("/generate-bill" ,UserAuthenication , generateBillController)


module.exports = router;