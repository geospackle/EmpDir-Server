"use strict";
const axios = require("axios");

const Employee = require("./models/employee");

const getEmployee = async (req, res) => {
  try {
    const employees = await Employee.findAll({ order: ["last_name"] });
    res.status(200).send(employees);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const postEmployee = async (req, res) => {
  console.log("posting", req.body);
  const { first_name, last_name, phone, picture, department } = req.body;
  try {
    const newEmployee = await Employee.create({
      first_name,
      last_name,
      phone,
      picture,
      department,
    });
    res.status(201).send(newEmployee);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const setRequest = (request, employee) => {
  const departments = ["Engineering", "Marketing", "Manager", "Analysis"];
  const randomNo = Math.floor(Math.random() * 4);
  const department = departments[randomNo];
  console.log("req", request);
  request.body.first_name = employee.name.first;
  request.body.last_name = employee.name.last;
  request.body.phone = employee.phone;
  request.body.picture = employee.picture.large;
  request.body.department = department;
  return request;
};

// need to handle errors from here
const postFromArray = async (data, apiCall, request, response, iter) => {
  if (iter === 0) return;
  iter--;
  console.log(iter);
  const employee = data[iter];
  request = setRequest(request, employee);
  apiCall(request, response).then(
    postFromArray(data, apiCall, request, response, iter)
  );
};

const mockRequest = {
  body: {
    first_name: "string",
    last_name: "string",
    phone: "string",
    picture: "string",
    department: "string",
  },
};

const mockResponse = {
  send: function () {},
  json: function (err) {
    console.log(err);
  },
  status: function (responseStatus) {
    console.log(responseStatus);
    return this;
  },
};

const insertMockEmployee = async (req, res) => {
  Employee.destroy({ truncate: true });
  //error handling
  const noEmployees = parseInt(req.query.number);
  const url = `https://randomuser.me/api/?results=${noEmployees}`;
  axios
    .get(url)
    .then((response) => {
      const data = response.data.results;

      postFromArray(
        data,
        postEmployee,
        mockRequest,
        mockResponse,
        noEmployees
      ).then((message) => {
        console.log("mess", message);
        res.status(200).send("data posted");
      });
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
};

module.exports = { getEmployee, postEmployee, insertMockEmployee };
