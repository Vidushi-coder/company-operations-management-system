const Employee = require('../models/Employee');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// CREATE EMPLOYEE (also creates linked User account)
const createEmployee = async (req, res) => {
  try {
    const { name, email, password, phone, department, designation, dateOfJoining, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'A user with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'Employee'
    });

    const newEmployee = await Employee.create({
      userId: newUser._id,
      name,
      email,
      phone,
      department,
      designation,
      dateOfJoining
    });

    res.status(201).json({
      message: 'Employee created successfully',
      employee: newEmployee
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET ALL EMPLOYEES (with search and filters)
const getAllEmployees = async (req, res) => {
  try {
    const { search, department, status, role } = req.query;
    let filter = {};

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }
    if (department) {
      filter.department = department;
    }
    if (status) {
      filter.status = status;
    }

    let employees = await Employee.find(filter).populate('userId', 'role email');

    if (role) {
      employees = employees.filter(emp => emp.userId?.role === role);
    }

    res.status(200).json({ count: employees.length, employees });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET ONE EMPLOYEE (Profile)
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate('userId', 'role email');
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ employee });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// UPDATE EMPLOYEE
const updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE EMPLOYEE (also deletes linked User account)
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    await Employee.findByIdAndDelete(req.params.id);
    await User.findByIdAndDelete(employee.userId);

    res.status(200).json({ message: 'Employee deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
};