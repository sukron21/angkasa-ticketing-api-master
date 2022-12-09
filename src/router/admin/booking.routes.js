const express = require("express");
const router = express.Router();
const {
  getBooking,
  getBookingDetail,
  updateBooking,
  cancelBooking,
  getBookingDetailByUserId,
} = require("../../controller/admin/booking.controller");
// const jwtAuth = require("../../middleware/auth.middleware");

router
  .get("/", getBooking)
  .get("/:id", getBookingDetail)
  .get("/user/:user_id", getBookingDetailByUserId)
  .put("/:id", updateBooking)
  .delete("/:id", cancelBooking);

module.exports = router;
