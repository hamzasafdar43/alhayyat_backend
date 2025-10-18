const express = require("express");
const upload = require("../../middleware/upload");
const UserAuthenication = require("../../middleware/UserAuthenication");
const { AddItemAccessories, getAllItemAccessories, updateItemAccessories, deleteItemAccessories, allSaleAccessoriesController } = require("../../controller/accessoriesShop/accessoriesShopCtrl");
const router = express.Router();

 

router.post("/add-accessories-item", UserAuthenication,  upload.single("image") ,  AddItemAccessories  );
router.get("/all-accessories", UserAuthenication ,  getAllItemAccessories  );
router.put("/update-accessories-items/:id",UserAuthenication , upload.single("image") , updateItemAccessories );
router.delete("/delete-accessories-items/:id", UserAuthenication,    deleteItemAccessories);


router.get("/all-sale-accessories",   allSaleAccessoriesController  );



module.exports = router;