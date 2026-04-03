const express = require("express");
const upload = require("../../middleware/upload");
const UserAuthenication = require("../../middleware/UserAuthenication");
const { AddItemAccessories, getAllItemAccessories, updateItemAccessories, deleteItemAccessories, SaleAccessoriesCtr, updateAccessoriesSale, deleteAccessoriesSale, getAccessoriesBillByDate, getAccessoriesDataMonthly } = require("../../controller/accessoriesShop/accessoriesShopCtrl");
const router = express.Router();



router.post("/add-accessories-item", UserAuthenication, upload.single("image"), AddItemAccessories);
router.get("/all-accessories", UserAuthenication, getAllItemAccessories);
router.put("/update-accessories-items/:id", UserAuthenication, upload.single("image"), updateItemAccessories);
router.delete("/delete-accessories-items/:id", UserAuthenication, deleteItemAccessories);
router.get("/accessories-bills-by-date", UserAuthenication, getAccessoriesBillByDate);
router.get("/accessories/monthly-data", UserAuthenication, getAccessoriesDataMonthly);


router.get("/accessories-sales", UserAuthenication, SaleAccessoriesCtr);
router.delete("/accessories-sales-delete/:id", UserAuthenication, deleteAccessoriesSale);
router.put("/accessories-sales-update/:id", UserAuthenication, updateAccessoriesSale);



module.exports = router;