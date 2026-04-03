const express = require("express");
const UserAuthenication =  require("../../middleware/UserAuthenication");
const { createExpense, deleteExpense, getExpenses, updateExpense, getExpensesByDate, getMonthlyExpensesData, getMonthlyDailyExpense } =  require("../../controller/expense/expenseController");


const router = express.Router();

router.post("/expense",UserAuthenication ,  createExpense);       
router.get("/expenses",UserAuthenication , getExpenses);          
router.put("/expense/:id", UserAuthenication ,  updateExpense);     
router.delete("/expense/:id",UserAuthenication ,  deleteExpense);  
router.get("/expense-by-date",UserAuthenication ,  getExpensesByDate);
router.get("/monthly-expense-data" , UserAuthenication , getMonthlyExpensesData);
router.get("/monthly-daily-expense-data" , UserAuthenication , getMonthlyDailyExpense);

module.exports = router;
