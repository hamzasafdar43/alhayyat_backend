const express = require("express");
const { createEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee } = require("../../controller/empolyees/employeeCTRL");
const UserAuthenication = require("../../middleware/UserAuthenication");


const router = express.Router();

router.post("/employees", UserAuthenication , createEmployee);        // Create
router.get("/employees", UserAuthenication , getEmployees);           // Get all
router.get("/employees/:id", UserAuthenication , getEmployeeById);    // ✅ Get single
router.put("/employees/:id", UserAuthenication , updateEmployee);     // ✅ Update
router.delete("/employees/:id", UserAuthenication , deleteEmployee);  // ✅ Delete

module.exports = router;
