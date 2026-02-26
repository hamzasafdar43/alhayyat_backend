const Accessories = require("../../models/accessoriesShop/accessoriesShopModel");
const SaleAccessories = require("../../models/accessoriesShop/accessoriesSaleModel");
const { getDateRange } = require("../../../utils/dateFilters");


// ============================================================================
// 🟨 1. Add  accessories items 
// ============================================================================
const AddItemAccessories = async (req, res) => {
  try {
    const { productName, price, cost, quantity } = req.body;
    const imageFile = req.file;
    const userId = req.user.id;
   

    if (!imageFile) {
      return res.status(400).json({ message: "Image is required." });
    }

    const existProductName = await Accessories.findOne({ productName , userId });

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
      userId
    });

    await newProduct.save();
    res.status(200).json({ message: "Product added successfully." });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};


// ============================================================================
// 🟨 2. Get all accessories items 
// ============================================================================
const getAllItemAccessories = async (req, res) => {
  try {
    const userId = req.user.id;
    const getAllProduct = await Accessories.find({userId});
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


// ============================================================================
// 🟨 Delete accessories item by ID
// ============================================================================

const deleteItemAccessories = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const deleted = await Accessories.findOneAndDelete({ _id: id, userId });

    if (!deleted) {
      return res.status(404).json({ message: "Product not found." });
    }
 
    res.status(200).json({ message: "Deleted Acccessories Items successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while deleting the product.",
      error: error.message,
    });
  }
};


// ============================================================================
// 🟨 Update accessories item by ID
// ============================================================================

const updateItemAccessories = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { productName, price, cost, quantity } = req.body;
    const imageFile = req.file;

    console.log("..........", imageFile)

    // Prepare update fields
    const updateFields = {
      productName,
      price,
      cost,
      quantity,
      imageFile
    };

    if (imageFile) {
      updateFields.image = imageFile.filename; // only update image if new one provided
    }

    const updated = await Accessories.findOneAndUpdate(
      { _id: id, userId },
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({
      message: "Updated Accessories Items successfully.",
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
// 🟨 5. Get all Accessories  Sales Record by filter (day, month, year)
// ============================================================================
const SaleAccessoriesCtr = async (req, res) => {
  try {
    const filter = req.query.filter;
    
    const { start, end } = getDateRange(filter);
    console.log("user id..." , req.user.id)

    const sales = await SaleAccessories.find({
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

const getAccessoriesBillByDate = async (req, res) => {
    const { date } = req.query;

    if (!date) return res.status(400).json({ message: "Date is required" });

    const d = new Date(date);
    const start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
    const end = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
    const userId = req.user.id
    const bills = await SaleAccessories.find({
        userId, createdAt: { $gte: start, $lte: end },
    });

    res.json(bills);
}

// ============================================================================
// 🟨 5. Update Accessories Sale Record
// ============================================================================
const updateAccessoriesSale = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const updatedSale = await SaleAccessories.findOneAndUpdate(
      { _id: id, userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedSale) {
      return res.status(404).json({
        success: false,
        message: "Accessories sale record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Accessories sale updated successfully.",
      data: updatedSale,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update accessories sale.",
      error: error.message,
    });
  }
};

// ============================================================================
// 🟨 6. Delete Accessories Sale Record
// ============================================================================
const deleteAccessoriesSale = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const deletedSale = await SaleAccessories.findOneAndDelete({ _id: id, userId });

    if (!deletedSale) {
      return res.status(404).json({
        success: false,
        message: "Accessories sale record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Accessories sale deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete accessories sale.",
      error: error.message,
    });
  }
};



module.exports = {
AddItemAccessories,
 deleteItemAccessories,
 updateItemAccessories,
 getAllItemAccessories,
 SaleAccessoriesCtr,
 updateAccessoriesSale,
 deleteAccessoriesSale,
 getAccessoriesBillByDate,
  
};
