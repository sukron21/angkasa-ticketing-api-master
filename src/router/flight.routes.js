const express = require("express");
const router = express.Router();

const {
  getFlight,
  getFlightDetail,
} = require("../controller/user/flight.controller");

router
  .get("/", getFlight)
  .get("/:id", getFlightDetail);
module.exports = router;
