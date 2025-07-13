const Accessories = require("../../models/accessoriesShop/accessoriesShopModel");
const SaleAccessories = require("../../models/accessoriesShop/accessoriesSaleModel")

const AddItemAccessories = async (req, res) => {
  try {
    const { productName, price, cost, quantity } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ message: "Image is required." });
    }

    const existProductName = await Accessories.findOne({ productName });

    if (existProductName) {
      return res.status(400).json({ message: "Product name already exists." });
    }


    const newProduct = new Accessories
    ({
      productName,
      image: imageFile.filename, // saved filename from multer
      price,
      cost,
      quantity,
    });

    await newProduct.save();
    res.status(200).json({ message: "Product added successfully." });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};

const getAllItemAccessories = async (req, res) => {
  try {
    const getAllProduct = await Accessories.find();
    if (!getAllProduct) {
      res.status(404).json({ message: "Products not founded", error });
    }
    res
      .status(200)
      .send({ message: "Get All Product Successfully", data: getAllProduct });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};

const deleteItemAccessories = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Accessories.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};

const updateItemAccessories = async (req, res) => {
  try {
    const { id } = req.params;
   

    const { productName, price, cost, quantity } = req.body;
    const imageFile = req.file;

    const updated = await Accessories.findByIdAndUpdate(
      id,
      { productName, image: imageFile.filename, price, cost, quantity },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product updated successfully", product: updated });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};


const allSaleAccessoriesController = async (req, res) => {
  try {
    const allSale = await SaleAccessories.find().populate("productId");
    
    if (!allSale) {
      return res.status(400).send({ message: "Sale not found" });
    }
    res.status(200).send({ message: "Get all sales successfully", allSale });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};









module.exports = {
AddItemAccessories,
 deleteItemAccessories,
 updateItemAccessories,
 getAllItemAccessories,
 allSaleAccessoriesController
  
};
