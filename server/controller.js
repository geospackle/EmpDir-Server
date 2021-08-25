"use strict";
const axios = require("axios");

const Employee = require("./models/employee");

const getEmployee = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.status(200).send(employees);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const postEmployee = async (req, res) => {
  console.log("posting", req.body);
  const { first_name, last_name, phone, department } = req.body;
  try {
    const newEmployee = await Employee.create({
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

function createQueue(tasks, maxNumOfWorkers = 4) {
  var taskIndex = 0;

  return new Promise((done) => {
    const getNextTask = () => {
      if (taskIndex < tasks.length) {
        tasks[taskIndex]()
          .then((result) => {
            tasks[taskIndex] = result;
            taskIndex++;
            getNextTask();
          })
          .catch((error) => {
            tasks[taskIndex] = error;
            taskIndex++;
            getNextTask();
          });
      } else {
        done(tasks);
      }
    };
    getNextTask();
  });
}

const postMultipleReqs = (apiCall, request, response, iterations) => {
  iterations = iterations - 1;
  console.log("iter", iterations);
  if (iterations === 0) return;
  apiCall(request, response).then(
    postMultipleReqs(apiCall, request, response, iterations)
  );
};

const insertMockEmployees = async (req, res) => {
  Employee.destroy({ truncate: true });
  //error handling
  const noEmployees = req.query.number;
  const url = "https://randomuser.me/api/?results=${noEmployees}";
  axios
    .get(url)
    .then((response) => {
      const departments = ["Engineering", "Marketing", "Manager", "Analysis"];
      const randomNo = Math.floor(Math.random() * 4);
      const department = departments[randomNo];
      const data = response.data.results;
      const employee = data[0];

      const mockRequest = {
        body: {
          first_name: employee.name.first,
          last_name: employee.name.last,
          phone: employee.phone,
          department: department,
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

      console.log("multipost");
      // set new department each time
      postMultipleReqs(postEmployee, mockRequest, mockResponse, noEmployees);
      res.status(200).send("got response from 3rd party server");
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
};

module.exports = { getEmployee, postEmployee, insertMockEmployees };
