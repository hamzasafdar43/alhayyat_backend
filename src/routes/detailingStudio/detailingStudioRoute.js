const express = require("express");
const { getAllDetailingStudioBills, getDetailingBillByDate, updateDetailingCommissionStatus } = require("../../controller/detailingStudio/detailingStudio");
const router = express.Router();


router.get("/detailing/bills", getAllDetailingStudioBills);
router.get("/detailing/bills-by-date", getDetailingBillByDate);
router.put("/detailing/update-commission", updateDetailingCommissionStatus);


module.exports = router;