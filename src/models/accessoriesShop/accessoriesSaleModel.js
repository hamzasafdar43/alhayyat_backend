const mongoose = require("mongoose");

const accessoriesSaleSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "accessories",
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
}, { timestamps: true });

const Sale = mongoose.model("SaleAccessories", accessoriesSaleSchema);
module.exports = Sale;
