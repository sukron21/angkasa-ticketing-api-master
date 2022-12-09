const express = require("express");
const router = express.Router();
const {
  getMyBooking,
  getBookingDetail,
  createBooking,
  cancelBooking,
} = require("../controller/user/booking.controller");
const jwtAuth = require("../middleware/auth.middleware");

router
  .get("/my", jwtAuth, getMyBooking)
  .get("/:id", jwtAuth, getBookingDetail)
  .post("/", createBooking)
  .delete("/:id", cancelBooking);

module.exports = router;
