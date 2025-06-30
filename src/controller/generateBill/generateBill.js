const CarWash = require("../../models/carWash/carwashModel");
const OilShop = require("../../models/oilShop/oilShopModel");
const OilShopSale = require("../../models/oilShop/saleProductModel");
const Accessories = require("../../models/accessoriesShop/accessoriesShopModel");
const AccessoriesSale = require("../../models/accessoriesShop/accessoriesSaleModel");
const carDetailing = require("../../models/carDetailing/carDetailingModel");

const generateBillController = async (req, res) => {
  const { records } = req.body;
  console.log("Records:", records);

  if (!Array.isArray(records)) {
    return res.status(400).json({ message: "Records should be an array" });
  }

  try {
    // Step 1: Validate all records before saving anything
    for (const record of records) {
      const { category } = record;

      if (category === "oilShop") {
        const { productId, quantitySold, productName } = record;

        const product = await OilShop.findById(productId);
        if (!product) {
          return res
            .status(404)
            .json({ message: `OilShop product not found: ${productName}` });
        }
        if (product.quantity < quantitySold) {
          return res
            .status(400)
            .json({
              message: `Insufficient stock for product: ${productName}`,
            });
        }
      } else if (category === "accessoriesShop") {
        const { productId, quantitySold, productName } = record;

        const accessory = await Accessories.findById(productId);
        if (!accessory) {
          return res
            .status(404)
            .json({ message: `Accessory product not found: ${productName}` });
        }
        if (accessory.quantity < quantitySold) {
          return res
            .status(400)
            .json({
              message: `Insufficient stock for accessory: ${productName}`,
            });
        }
      }
    }

    // Step 2: Save all records after validation passes
    for (const record of records) {
      const { category } = record;
      if (category === "cardetailng") {
        const { carName, polish, detailingMaster, detailingBill, commission } =
          record;
        await carDetailing.create({
         carNameDetailing,
          polish,
          detailingMaster,
          detailingBill,
          commission,
        });
      }
      if (category === "CarWash") {
        const { carName, bill, commission, carWasher, phoneNumber } = record;
        await CarWash.create({
          carName,
          bill,
          commission,
          carWasher,
          phoneNumber,
        });
      } else if (category === "oilShop") {
        const { productId, quantitySold, sellingPrice } = record;
        await OilShopSale.create({ productId, quantitySold, sellingPrice });

        const product = await OilShop.findById(productId);
        product.quantity -= quantitySold;
        await product.save();
      } else if (category === "accessoriesShop") {
        const { productId, quantitySold, sellingPrice } = record;
        await AccessoriesSale.create({ productId, quantitySold, sellingPrice });
        console.log("id product", productId);

        const accessory = await Accessories.findById(productId);
        accessory.quantity -= quantitySold;
        await accessory.save();
      }
    }

    return res.status(200).json({ message: "All records saved successfully." });
  } catch (error) {
    console.error("Error in /submit-sales:", error);
    return res
      .status(500)
      .json({ message: error.message || "Internal server error" });
  }
};

module.exports = {
  generateBillController,
};
