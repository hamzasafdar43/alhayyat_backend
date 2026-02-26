const express = require("express");
const UserAuthenication =  require("../../middleware/UserAuthenication");
const { createExpense, deleteExpense, getExpenses, updateExpense, getExpensesByDate } =  require("../../controller/expense/expenseController");


const router = express.Router();

router.post("/expense",UserAuthenication ,  createExpense);       
router.get("/expenses",UserAuthenication , getExpenses);          
router.put("/expense/:id", UserAuthenication ,  updateExpense);     
router.delete("/expense/:id",UserAuthenication ,  deleteExpense);  
router.get("/expense-by-date",UserAuthenication ,  getExpensesByDate);

module.exports = router;
