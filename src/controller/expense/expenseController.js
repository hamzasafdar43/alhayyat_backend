const Expense = require("../../models/expense/expenseModel");

// ✅ Create new expense
const createExpense = async (req, res) => {
    try {
        const { expenseType, category, amount, date, description } = req.body;
        const userId = req.user.id; // comes from middleware

        const newExpense = await Expense.create({
            expenseType,
            category,
            amount,
            date,
            description,
            userId,
        });

        res.status(201).json({
            success: true,
            message: "Expense added successfully",
            data: newExpense,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get all expenses (optionally filtered by type)
const getExpenses = async (req, res) => {
    try {
        const { type } = req.query; // e.g. ?type=daily or ?type=monthly
        const userId = req.user.id;

        const filter = { userId };
        if (type) filter.expenseType = type;

        const expenses = await Expense.find(filter).sort({ date: -1 });

        res.status(200).json({ success: true, data: expenses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Update expense
const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // find expense belonging to this user
        const expense = await Expense.findOne({ _id: id, userId });
        if (!expense) {
            return res
                .status(404)
                .json({ success: false, message: "Expense not found or unauthorized" });
        }

        const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            data: updatedExpense,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Delete expense
const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const expense = await Expense.findOneAndDelete({ _id: id, userId });

        if (!expense) {
            return res
                .status(404)
                .json({ success: false, message: "Expense not found or unauthorized" });
        }

        res
            .status(200)
            .json({ success: true, message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const getExpensesByDate = async (req, res) => {
    const { date } = req.query;

    if (!date) return res.status(400).json({ message: "Date is required" });

    const expenseType = "daily";
    const userId = req.user.id
    

    const d = new Date(date);
    const start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
    const end = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
   
    const bills = await Expense.find({
        expenseType, userId,
        createdAt: { $gte: start, $lte: end },
    });

    console.log("Expenses for date:", date, bills);

    res.json(bills);
}

const getMonthlyExpensesData = async ( req, res ) => {
    try {
        const { month, year } = req.query;
       
    const expenseType = "monthly";

        if (!month || !year) {
            return res.status(400).json({ message: "Month and year are required" });
        }
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 0, 23, 59, 59, 999);
        const bills = await Expense.find({
           expenseType , userId : req.user.id,
            createdAt: { $gte: start, $lte: end }
        });
        res.status(200).json(bills);
    } catch (error) {
        res.status(500).json({ message: "Failed to get monthly expenses data", error: error.message });
    }
}

const getMonthlyDailyExpense = async ( req, res ) => {
    try {
        const { month, year } = req.query;
       
    const expenseType = "daily";
        if (!month || !year) {
            return res.status(400).json({ message: "Month and year are required" });
        }
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 0, 23, 59, 59, 999);
        const bills = await Expense.find({
           expenseType , userId : req.user.id,
            createdAt: { $gte: start, $lte: end }
        });
        res.status(200).json(bills);
    } catch (error) {
        res.status(500).json({ message: "Failed to get monthly expenses data", error: error.message });
    }
}

module.exports = {
    createExpense, deleteExpense, getExpenses, updateExpense , getExpensesByDate, getMonthlyExpensesData , getMonthlyDailyExpense
};