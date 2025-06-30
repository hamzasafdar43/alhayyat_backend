const mongoose = require("mongoose");

const carDetailingSaleSchema = new mongoose.Schema({

  carNameDetailing: {
    type: String,
    required: true
  },
  polish: {
     type: String,
    required: true
  },
  detailingMaster: {
    type: String,
    required: true
  },
  detailingBill: {
    type: Number,
    required: true
  },
  commission: {
    type: Number,
    required: true
  },
}, { timestamps: true });

const carDetailing = mongoose.model("cardetailing", carDetailingSaleSchema);
module.exports = carDetailing;
