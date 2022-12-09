const express = require("express");
const router = express.Router();

const {
  getFlight,
  getFlightDetail,
  insertFlight,
  updateFlight,
  deleteFlight,
  getFlightFilter,
} = require("../../controller/admin/flight.controller");

router
  .get("/", getFlight)
  .get("/:id", getFlightDetail)
  .get("/filter/search", getFlightFilter)
  .post("/", insertFlight)
  .put("/:id", updateFlight)
  .delete("/:id", deleteFlight);
module.exports = router;
