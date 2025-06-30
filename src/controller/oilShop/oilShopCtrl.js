const Product = require("../../models/oilShop/oilShopModel");
const Sale = require("../../models/oilShop/saleProductModel");


const saveOilShopProduct = async (req, res) => {
  try {
    const { productName, price, cost, quantity } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ message: "Image is required." });
    }

    const existProductName = await Product.findOne({ productName });

    if (existProductName) {
      return res.status(400).json({ message: "Product name already exists." });
    }


    const newProduct = new Product({
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

const getAllProduct = async (req, res) => {
  try {
    const getAllProduct = await Product.find();
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



const deleteProductCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};

const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
   

    const { productName, price, cost, quantity } = req.body;
    const imageFile = req.file;

    const updated = await Product.findByIdAndUpdate(
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

// const saleProductCtrl = async (req, res) => {
//   try {
//     const { productId, quantitySold, sellingPrice } = req.body;
  
//     const product = await Sale.find().populate("productId");

//     console.log("product" , product)
//     if (!product || product.quantity < quantitySold) {
//       return res
//         .status(400)
//         .json({ message: "Invalid product or insufficient stock" });
//     }

 

//     product.quantity -= quantitySold;
//     await product.save();

//     // Record sale
//     const sale = await Sale.create({
//       productId,
//       quantitySold,
//       sellingPrice,
//     });

//     res.status(200).json({ message: "Product sale successfully", sale });
//   } catch (error) {
//     console.log("error", error);
//     res.status(500).json({ message: "Something went wrong.", error });
//   }
// };



const saleProductCtrl = async (req, res) => {
  try {
    const { productId, quantitySold, sellingPrice } = req.body;

    // Find product from Product model
    const product = await Product.findById(productId);

    if (!product || product.quantity < quantitySold) {
      return  res.status(400).json({ message: "Invalid product or insufficient stock" });
    }

    // Decrease quantity
    product.quantity -= quantitySold;
    await product.save();

    // Create sale record
    const sale = await Sale.create({
      productId,
      quantitySold,
      sellingPrice,
    });

    // Populate product info in the response
    const populatedSale = await Sale.findById(sale._id).populate("productId");

    res.status(200).json({ message: "Product sale successfully", sale: populatedSale });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Something went wrong.", error });
  }
};


const allSaleController = async (req, res) => {
  try {
    const allSale = await Sale.find().populate("productId");
    if (!allSale) {
      return res.status(400).send({ message: "Sale not found" });
    }
    res.status(200).send({ message: "Get all sales successfully", allSale });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};




module.exports = {
  saveOilShopProduct,
  getAllProduct,
  deleteProductCtrl,
  updateProductController,
  saleProductCtrl,
  allSaleController,
 
  
};
