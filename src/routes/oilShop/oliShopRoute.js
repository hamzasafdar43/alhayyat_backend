const express = require("express");
const { saveOilShopProduct, getAllProduct, updateProductController, deleteProductCtrl, saleProductCtrl, allSaleController } = require("../../controller/oilShop/oilShopCtrl");
const upload = require("../../middleware/upload");
const router = express.Router();


router.post("/add-product",  upload.single("image") ,  saveOilShopProduct  );
router.get("/all-product",  getAllProduct  );
router.put("/update-product/:id", upload.single("image") ,  updateProductController );
router.delete("/delete-product/:id",   deleteProductCtrl );



// sale Product routes

router.post("/sale-product",   saleProductCtrl  );
router.get("/all-sales",   allSaleController  );





module.exports = router;
