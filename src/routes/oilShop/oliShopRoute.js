const express = require("express");
const { saveOilShopProduct, getAllProduct, updateProductController, deleteProductCtrl, saleProductCtrl, allSaleController } = require("../../controller/oilShop/oilShopCtrl");
const upload = require("../../middleware/upload");
const UserAuthenication = require("../../middleware/UserAuthenication");
const router = express.Router();


router.post("/add-product", UserAuthenication, upload.single("image"), saveOilShopProduct);
router.get("/all-product", UserAuthenication, getAllProduct);
router.put("/update-product/:id", UserAuthenication, upload.single("image"), updateProductController);
router.delete("/delete-product/:id", UserAuthenication, deleteProductCtrl);



// sale Product routes

router.post("/sale-product", saleProductCtrl);
router.get("/all-sales", allSaleController);





module.exports = router;
