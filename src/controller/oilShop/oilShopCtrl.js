const Product = require("../../models/oilShop/oilShopModel");
const Sale = require("../../models/oilShop/saleProductModel");
const { getDateRange } = require("../../../utils/dateFilters");

// ============================================================================
// 🟨 1. Add Oil Shop Product
// ============================================================================
const addOilShopProduct = async (req, res) => {
  try {
    const { productName, price, cost, quantity } = req.body;
    const imageFile = req.file;
    const userId = req.user.id;

    if (!imageFile) {
      return res.status(400).json({ message: "Image is required." });
    }

    const existProductName = await Product.findOne({ productName, userId });
    if (existProductName) {
      return res.status(400).json({ message: "Product name already exists." });
    }

    const newProduct = new Product({
      productName,
      image: imageFile.filename,
      price,
      cost,
      quantity,
      userId,
    });

    await newProduct.save();
    res.status(200).json({ message: "Product added successfully." });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};

// ============================================================================
// 🟨 2. Get All Oil Shop Products
// ============================================================================
const getAllOilShopProducts = async (req, res) => {
  try {
    const userId = req.user.id;
    const products = await Product.find({ userId });

    if (!products.length) {
      return res.status(404).json({ message: "No products found." });
    }

    res
      .status(200)
      .json({ message: "Get All OilShop Products Successfully", data: products });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};

// ============================================================================
// 🟨 3. Update Oil Shop Product
// ============================================================================
const updateOilShopProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { productName, price, cost, quantity } = req.body;
    const imageFile = req.file;

    const updateFields = { productName, price, cost, quantity };

    if (imageFile) updateFields.image = imageFile.filename;

    const updated = await Product.findOneAndUpdate(
      { _id: id, userId },
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({
      message: "OilShop product updated successfully.",
      product: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while updating the product.",
      error: error.message,
    });
  }
};

// ============================================================================
// 🟨 4. Delete Oil Shop Product
// ============================================================================
const deleteOilShopProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deleted = await Product.findOneAndDelete({ _id: id, userId });

    if (!deleted) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while deleting the product.",
      error: error.message,
    });
  }
};

// ============================================================================
// 🟨 5. Record Oil Sale
// ============================================================================
const addOilSale = async (req, res) => {
  try {
    const { productId, quantitySold, sellingPrice } = req.body;
    const userId = req.user.id;

    const product = await Product.findOne({ _id: productId, userId });

    if (!product || product.quantity < quantitySold) {
      return res
        .status(400)
        .json({ message: "Invalid product or insufficient stock." });
    }

    // Decrease stock
    product.quantity -= quantitySold;
    await product.save();

    // Create Sale Record
    const sale = await Sale.create({
      productId,
      quantitySold,
      sellingPrice,
      userId,
    });

    const populatedSale = await Sale.findById(sale._id).populate("productId");

    res.status(200).json({
      message: "Oil sale recorded successfully.",
      sale: populatedSale,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};

// ============================================================================
// 🟨 6. Get All Oil Sales (Filter by Day / Month / Year)
// ===========================================================================


const getFilteredOilSales = async (req, res) => {
  try {
    const filter = req.query.filter;
    
    const { start, end } = getDateRange(filter);
    

    const sales = await Sale.find({
      userId: req.user.id,
      createdAt: { $gte: start, $lte: end },
    }).populate("productId");
  
    res.status(200).json(sales);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get filtered bills", error: error.message });
  }
};

// ============================================================================
// 🟨 3. Get bills by specific date
// ============================================================================
const getOilShopBillByDate = async (req, res) => {
    const { date } = req.query;

    if (!date) return res.status(400).json({ message: "Date is required" });

    const d = new Date(date);
    const start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
    const end = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
    const userId = req.user.id
    const bills = await Sale.find({
        userId, createdAt: { $gte: start, $lte: end },
    });

    res.json(bills);
}

// ============================================================================
// 🟨 7. Update Oil Sale Record
// ============================================================================
const updateOilSale = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const updatedSale = await Sale.findOneAndUpdate(
      { _id: id, userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedSale) {
      return res.status(404).json({
        success: false,
        message: "Oil sale record not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Oil sale updated successfully.",
      data: updatedSale,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update oil sale.",
      error: error.message,
    });
  }
};

// ============================================================================
// 🟨 8. Delete Oil Sale Record
// ============================================================================
const deleteOilSale = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const deletedSale = await Sale.findOneAndDelete({ _id: id, userId });

    if (!deletedSale) {
      return res.status(404).json({
        success: false,
        message: "Oil sale record not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Oil sale deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete oil sale.",
      error: error.message,
    });
  }
};

const getOilShopMonthlyData = async ( req, res ) => {
    try {
        const { month, year } = req.query;
       

        if (!month || !year) {
            return res.status(400).json({ message: "Month and year are required" });
        }
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 0, 23, 59, 59, 999);
        const bills = await Sale.find({
            userId : req.user.id,
            createdAt: { $gte: start, $lte: end }
        }).populate("productId");
        res.status(200).json(bills);
    } catch (error) {
        res.status(500).json({ message: "Failed to get monthly oil data", error: error.message });
    }
}

module.exports = {
  addOilShopProduct,
  getAllOilShopProducts,
  updateOilShopProduct,
  deleteOilShopProduct,
  addOilSale,
  getFilteredOilSales,
  updateOilSale,
  deleteOilSale,
  getOilShopBillByDate,
  getOilShopMonthlyData,
};
