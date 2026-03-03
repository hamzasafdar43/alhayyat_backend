const express = require("express");
const { getallbills  ,  updateCarWashbill, deleteCarWashbill, getCarWashBillByDate, updateCommissionStatus, getCarWashDataMonthly} = require("../../controller/carWash/carwashCtrl");
const router = express.Router();
const UserAuthenication = require("../../middleware/UserAuthenication");



router.get("/carWash-bills", UserAuthenication , getallbills);
router.post("/commission-paid",UserAuthenication ,  updateCommissionStatus);

router.get("/carWash-bill-date", UserAuthenication,  getCarWashBillByDate);
router.delete("/carWash-bill-delete/:id", UserAuthenication,  deleteCarWashbill);
router.put("/carWash-bills-update/:id", UserAuthenication,  updateCarWashbill);
router.get("/carWash/monthly-data", UserAuthenication, getCarWashDataMonthly);




module.exports = router;
