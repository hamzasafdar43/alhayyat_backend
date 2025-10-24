const express = require("express");


const upload = require("../../middleware/upload");
const UserAuthentication = require("../../middleware/UserAuthenication");
const {   addOilShopProduct,
  getAllOilShopProducts,
  updateOilShopProduct,
  deleteOilShopProduct,
  addOilSale,
  getFilteredOilSales,
  updateOilSale,
  deleteOilSale, } = require("../../controller/oilShop/oilShopCtrl");

const router = express.Router();


router.post(
  "/add-product",
  UserAuthentication,
  upload.single("image"),
  addOilShopProduct
);

router.get("/all-products", UserAuthentication, getAllOilShopProducts);

router.put(
  "/update-product/:id",
  UserAuthentication,
  upload.single("image"),
  updateOilShopProduct
);

router.delete(
  "/delete-product/:id",
  UserAuthentication,
  deleteOilShopProduct
);


router.post("/add-sale", UserAuthentication, addOilSale);
router.get("/sales", UserAuthentication, getFilteredOilSales);
router.put("/update-sale/:id", UserAuthentication, updateOilSale);
router.delete("/delete-sale/:id", UserAuthentication, deleteOilSale);


module.exports = router;
