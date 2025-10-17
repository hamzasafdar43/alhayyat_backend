const { getDateRange } = require("../../../utils/dateFilters");
const carWash = require("../../models/carWash/carwashModel")


// ============================================================================
// 🟨 1. // generatecarwashbillCtrl
// ============================================================================
const generatecarwashbillCtrl = async (req, res) => {
    try {
        const { carName, bill, commission, carWasher, phoneNumber } = req.body;

        const newBill = new carWash({
            carName,
            bill,
            commission,
            carWasher,
            phoneNumber
        });

        await newBill.save();

        res.status(200).json({ message: "Car wash bill generated successfully", bill: newBill });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};


// ============================================================================
// 🟨 2. Get all bills by filter (day, month, year)
// ============================================================================
const getallbills = async (req, res) => {
    try {
        const filter = req.query.filter;
        const { start, end } = getDateRange(filter);

        const bills = await carWash.find({
            createdAt: { $gte: start, $lte: end }
        });

        res.status(200).json(bills);
    } catch (error) {
        res.status(500).json({ message: "Failed to get filtered bills", error: error.message });
    }
}

// ============================================================================
// 🟨 3. Get bills by specific date
// ============================================================================
const getCarWashBillByDate = async (req, res) => {
    const { date } = req.query;

    if (!date) return res.status(400).json({ message: "Date is required" });

    const d = new Date(date);
    const start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
    const end = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);

    const bills = await carWash.find({
        createdAt: { $gte: start, $lte: end },
    });

    res.json(bills);
}

// ============================================================================
// 🟨 4. Update Car Wash Commission Status
// ============================================================================
const updateCommissionStatus = async (req, res) => {
    try {
        const { _id } = req.body;

        const carWashRecord = await carWash.findById(_id);

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
        const updatedbill = await carWash.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
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
        const deletedbill = await carWash.findByIdAndDelete(req.params.id);
        if (!deletedbill) {
            return res.status(404).json({ message: "Car wash bill not found" });
        }
        res.status(200).json({ message: "Bill deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete product", error: error.message });
    }
};


module.exports = {
    generatecarwashbillCtrl,
    getallbills,
    updateCarWashbill,
    deleteCarWashbill,
    getCarWashBillByDate,
    updateCommissionStatus

};
