const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/employee", controller.getEmployee);
router.post("/employee", controller.postEmployee);

module.exports = router;
