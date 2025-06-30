const express = require("express");
const { generatecarwashbillCtrl ,getallbills  ,  updateCarWashbill, deleteCarWashbill} = require("../../controller/carWash/carwashCtrl");
const router = express.Router();
// const UserAuthenication = require("../../middleware/UserAuthenication")
const upload = require("../../middleware/upload");
const { saveOilShopProduct } = require("../../controller/oilShop/oilShopCtrl");



router.post("/carWash-bill",  generatecarwashbillCtrl  );
router.get("/carWash-bills",  getallbills);
router.delete("/carWash-bill-delete/:id",  deleteCarWashbill);
router.put("/carWash-bills-update/:id",  updateCarWashbill);
router.post("/add-product" , upload.single("image") , saveOilShopProduct)



module.exports = router;
