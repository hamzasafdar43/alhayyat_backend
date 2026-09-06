const express = require("express");
const { getAllDetailingStudioBills, getDetailingBillByDate, updateDetailingCommissionStatus, getDetailingDataMonthly, deleteDetailingStudioConttroller, updateDetailingStudioController } = require("../../controller/detailingStudio/detailingStudio");
const UserAuthenication = require("../../middleware/UserAuthenication");
const router = express.Router();


router.get("/detailing/bills",UserAuthenication , getAllDetailingStudioBills);
router.get("/detailing/bills-by-date", UserAuthenication,  getDetailingBillByDate);
router.put("/detailing/update-commission",UserAuthenication ,  updateDetailingCommissionStatus);
router.get("/detailing/monthly-data", UserAuthenication, getDetailingDataMonthly);
router.delete("/detailing/delete/:id", UserAuthenication, deleteDetailingStudioConttroller);
router.put("/detailing/update/:id", UserAuthenication, updateDetailingStudioController);


module.exports = router;