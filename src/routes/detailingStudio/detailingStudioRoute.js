const express = require("express");
const { getallDetailingStudioBills } = require("../../controller/detailingStudio/detailingStudio");
const router = express.Router();


router.get("/detailing-studio-bills" , getallDetailingStudioBills )


module.exports = router;