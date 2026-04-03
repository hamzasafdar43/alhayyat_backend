const { getDateRange } = require("../../../utils/dateFilters");
const carWash = require("../../models/carWash/carwashModel")


// ============================================================================
// 🟨 2. Get all bills by filter (day, month, year)
// ============================================================================
const getallbills = async (req, res) => {
  try {
    const filter = req.query.filter;
    const { start, end } = getDateRange(filter);

    // ✅ Correct: userId and createdAt are separate fields
    const bills = await carWash.find({
      userId: req.user.id,
      createdAt: { $gte: start, $lte: end },
    });

    res.status(200).json(bills);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get filtered bills", error: error.message });
  }
};

// ============================================================================
// 🟨 3. Get bills by specific date
// ============================================================================
const getCarWashBillByDate = async (req, res) => {
    const { date } = req.query;

    if (!date) return res.status(400).json({ message: "Date is required" });

    const d = new Date(date);
    const start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
    const end = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
    const userId = req.user.id
    const bills = await carWash.find({
        userId, createdAt: { $gte: start, $lte: end },
    });

    res.json(bills);
}

// ============================================================================
// 🟨 4. Update Car Wash Commission Status
// ============================================================================
const updateCommissionStatus = async (req, res) => {
    try {
        const { _id } = req.body;
        const userId = req.user.id;

        const carWashRecord = await carWash.findById({ _id, userId });

        if (!carWashRecord) {
            return res.status(404).json({ message: "Car wash record not found" });
        }

        if (carWashRecord.commissionStatus === "pending") {
            carWashRecord.commissionStatus = "Paid";
            await carWashRecord.save();
        }

        const { carWasher, commission } = carWashRecord;

        res.status(200).json({
            message: `Successfully paid ${carWasher} total ${commission}`,
            carWash: carWashRecord
        });

    } catch (error) {
        res.status(500).json({ message: "Failed to update commission status", error: error.message });
    }
};



// ============================================================================
// 🟨 5. Update Car Wash Bill Record
// ============================================================================
const updateCarWashbill = async (req, res) => {

    try {
        const userId = req.user.id;

        const updatedbill = await carWash.findOneAndUpdate(
            { _id: req.params.id, userId }, // 👈 secure query
            req.body,
            { new: true }
        );
        if (!updatedbill) {
            return res.status(404).json({ message: "bill are not found" });
        }
        res.status(200).json({ message: "Car wash bill updated successfully", updatedbill });
    } catch (error) {
        res.status(500).json({ message: "Failed to update product", error: error.message });
    }
};


// ============================================================================
// 🟨 6. Delete Car Wash Bill Record
// ============================================================================
const deleteCarWashbill = async (req, res) => {
    try {
         const userId = req.user.id;
        const deletedbill = await carWash.findByIdAndDelete({ _id: req.params.id, userId});
        if (!deletedbill) {
            return res.status(404).json({ message: "Car wash bill not found" });
        }
        res.status(200).json({ message: "Bill deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete product", error: error.message });
    }
};


const getCarWashDataMonthly = async ( req, res ) => {
    try {
        const { month, year } = req.query;
       

        if (!month || !year) {
            return res.status(400).json({ message: "Month and year are required" });
        }
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 0, 23, 59, 59, 999);
        const bills = await carWash.find({
            userId : req.user.id,
            createdAt: { $gte: start, $lte: end }
        });
        res.status(200).json(bills);
    } catch (error) {
        res.status(500).json({ message: "Failed to get monthly detailing data", error: error.message });
    }
}

module.exports = {
    getallbills,
    updateCarWashbill,
    deleteCarWashbill,
    getCarWashBillByDate,
    updateCommissionStatus,
    getCarWashDataMonthly,

};
