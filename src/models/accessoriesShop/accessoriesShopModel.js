const mongoose = require("mongoose");

const accessoriesShopSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true
  }
}, { timestamps: true });

const accessoriesShopModel = mongoose.model("accessories", accessoriesShopSchema);
module.exports = accessoriesShopModel