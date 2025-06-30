const express = require("express");
const upload = require("../../middleware/upload");
const { AddItemAccessories, getAllItemAccessories, updateItemAccessories, deleteItemAccessories, allSaleAccessoriesController } = require("../../controller/accessoriesShop/accessoriesShopCtrl");
const router = express.Router();

 

router.post("/add-accessories-item",  upload.single("image") ,  AddItemAccessories  );
router.get("/all-accessories",  getAllItemAccessories  );
router.put("/update-accessories-items/:id", upload.single("image") , updateItemAccessories );
router.delete("/delete-accessories-items/:id",   deleteItemAccessories);


router.get("/all-sale-accessories",   allSaleAccessoriesController  );



module.exports = router;