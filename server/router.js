const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/employee", controller.getEmployee);
router.post("/employee", controller.postEmployee);
router.post("/_insert-mock-employee", controller.insertMockEmployee);

module.exports = router;
