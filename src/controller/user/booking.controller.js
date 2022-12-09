const createError = require("http-errors");
const { v4: uuid } = require("uuid");
const { success, failed } = require("../../helper/response.helper");

const bookingModel = require("../../model/user/booking.model");

const bookingController = {
  createBooking: async (req, res, next) => {
    try {
      const id = uuid();

      const bookingData = {
        booking_id: id,
        user_id: req.body.user_id,
        flight_id: req.body.flight_id,
        airline_id: req.body.airline_id,
        psg_title: req.body.psg_title,
        psg_name: req.body.psg_name,
        psg_nationality: req.body.psg_nationality,
        travel_insurance: req.body.travel_insurance || true,
        payment_status: req.body.payment_status || false,
        total: req.body.total,
      };

      console.log(bookingData);

      bookingModel.createBooking(bookingData)
      .then((results) => {
        success(res, results, "success", "booking success");
      }).catch((err) => {
        failed(res, err.message, "failed", "fail booking ticket");
      })

      
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  getMyBooking: async (req, res, next) => {
    try {
      const { id } = req.decoded;
      const data = await bookingModel.getMyBooking(id);

      success(res, data.rows, "success", "get my booking success");
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  getBookingDetail: async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(id);

      const data = await bookingModel.getBookingDetail(id);
      delete data.rows[0].password;

      success(res, data.rows[0], "success", "get booking detail success");
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  cancelBooking: async (req, res, next) => {
    try {
      const { id } = req.params;

      const data = await bookingModel.getBookingDetail(id);
      await bookingModel.cancelBooking(id);

      success(res, data.rows[0], "success", "cancel booking success");
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },
};

module.exports = bookingController;
