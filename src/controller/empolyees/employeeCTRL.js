const Employee = require("../../models/empolyees/empolyeeModel");

// Create new employee
exports.createEmployee = async (req, res) => {
  try {
    const { name, email, phone, designation } = req.body;
    const userId = req.user.id;

    if (!name || !email || !phone || !designation) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const employee = new Employee({ name, email, phone, designation , userId });
    await employee.save();

    res.status(201).json({ message: "Employee created successfully", employee });
  } catch (error) {
    res.status(500).json({ message: "Error creating employee", error: error.message });
  }
};

// Get all employees
exports.getEmployees = async (req, res) => {
  try {
  const userId = req.user.id;
   const employees = await Employee.find({ userId });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error: error.message });
  }
};

// ✅ Get single employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const userId = req.user.id;
    const employee = await Employee.findOne({ _id: req.params.id, userId }); 
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee", error: error.message });
  }
};

// ✅ Update employee by ID
exports.updateEmployee = async (req, res) => {
  try {
    const { name, email, phone, designation } = req.body;
     const userId = req.user.id;
   
    const employee = await Employee.findOneAndUpdate(
      { _id: req.params.id, userId }, // ✅ condition
      { name, email, phone, designation },
      { new: true, runValidators: true }
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee updated successfully", employee });
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error: error.message });
  }
};

// ✅ Delete employee by ID
exports.deleteEmployee = async (req, res) => {
  try {
    const userId = req.user.id;

   const employee = await Employee.findOneAndDelete({ _id: req.params.id, userId });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error: error.message });
  }
};
