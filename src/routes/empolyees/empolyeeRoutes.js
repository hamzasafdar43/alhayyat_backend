const express = require("express");
const { createEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee } = require("../../controller/empolyees/employeeCTRL");


const router = express.Router();

router.post("/employees", createEmployee);        // Create
router.get("/employees", getEmployees);           // Get all
router.get("/employees/:id", getEmployeeById);    // ✅ Get single
router.put("/employees/:id", updateEmployee);     // ✅ Update
router.delete("/employees/:id", deleteEmployee);  // ✅ Delete

module.exports = router;
