
const { getDateRange } = require("../../../utils/dateFilters");
const detailingBill = require("../../models/carDetailing/carDetailingModel");

// ============================================================================
// 🟨 // 1. Get all bills by filter (day, month, year)
// ============================================================================
const getAllDetailingStudioBills = async (req, res) => {
    try {
        const filter = req.query.filter;
        const { start, end } = getDateRange(filter);

        const bills = await detailingBill.find({
            createdAt: { $gte: start, $lte: end }
        });

        res.status(200).json(bills);
    } catch (error) {
        res.status(500).json({ message: "Failed to get filtered bills", error: error.message });
    }
}

// ============================================================================
// 🟨 2. Get Detailing Bills by Specific Date
// ============================================================================
const getDetailingBillByDate = async (req, res) => {
    const { date } = req.query;

    if (!date) {
        return res.status(400).json({ message: "Date is required" });
    }

    try {
        const d = new Date(date);
        const start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
        const end = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);

        const bills = await detailingBill.find({
            createdAt: { $gte: start, $lte: end },
        });

        res.json(bills);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get detailing bills by date",
            error: error.message,
        });
    }
};

// ============================================================================
// 🟨 3. Update Detailing Commission Status
// ============================================================================
const updateDetailingCommissionStatus = async (req, res) => {
    try {
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).json({ message: "Bill ID is required" });
        }

        const record = await detailingBill.findById(_id);

        if (!record) {
            return res.status(404).json({ message: "Detailing record not found" });
        }

        if (record.commissionStatus === "pending") {
            record.commissionStatus = "Paid";
            await record.save();
        }

        const { employeeName, commission } = record;

        res.status(200).json({
            message: `Successfully marked commission as paid for ${employeeName}, total PKR ${commission}`,
            record,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update detailing commission status",
            error: error.message,
        });
    }
};

// ============================================================================
// 🟨 Exports
// ============================================================================
module.exports = {
    getAllDetailingStudioBills,
    getDetailingBillByDate,
    updateDetailingCommissionStatus,
};
