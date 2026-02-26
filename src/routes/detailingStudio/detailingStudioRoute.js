const express = require("express");
const { getAllDetailingStudioBills, getDetailingBillByDate, updateDetailingCommissionStatus } = require("../../controller/detailingStudio/detailingStudio");
const UserAuthenication = require("../../middleware/UserAuthenication");
const router = express.Router();


router.get("/detailing/bills",UserAuthenication , getAllDetailingStudioBills);
router.get("/detailing/bills-by-date", UserAuthenication,  getDetailingBillByDate);
router.put("/detailing/update-commission",UserAuthenication ,  updateDetailingCommissionStatus);


module.exports = router;