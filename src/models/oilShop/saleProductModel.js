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
}, { timestamps: true });

const Sale = mongoose.model("Sale", saleSchema);
module.exports = Sale;
