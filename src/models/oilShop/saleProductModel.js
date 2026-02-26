const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OilShop",
    required: true
  },
  quantitySold: {
    type: Number,
    required: true
  },
  sellingPrice: {
    type: Number,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true
  }
}, { timestamps: true });

const SaleOilProduct = mongoose.model("SaleOilProduct", saleSchema);
module.exports = SaleOilProduct;
