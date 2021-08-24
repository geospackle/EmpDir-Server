"use strict";

const Employee = require("./models/employee");

exports.getEmployee = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).send(employees);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.postEmployee = async (req, res) => {
  const { first_name, last_name, phone, department } = req.body;
  try {
    const newEmployee = await Event.create({
      first_name,
      last_name,
      phone,
      department,
    });
    res.status(201).send(newEmployee);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
