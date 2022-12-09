const pool = require("../../config/db");

const bookingModel = {
  getBooking: () => {
    return pool.query(`SELECT bookings.*, flights.*, airlines.*, users.* FROM bookings 
    JOIN (flights join airlines using (airline_id)) using (flight_id) join users using (user_id)`);
  },

  getBookingDetail: (id) => {
    return pool.query(`
    SELECT bookings.*, flights.*, airlines.*, users.* FROM bookings 
    JOIN (flights join airlines using (airline_id)) using (flight_id)
    JOIN users using (user_id) WHERE booking_id = '${id}'
    `);
  },
  getBookingDetailByUserId: (user_id) => {
    return pool.query(`
    SELECT bookings.*, flights.*, airlines.*, users.* FROM bookings 
    JOIN (flights join airlines using (airline_id)) using (flight_id)
    JOIN users using (user_id) WHERE user_id = '${user_id}'
    `);
  },

  updateBooking: (id, date) => {
    return pool.query(
      "UPDATE bookings SET payment_status = true, updated_at = $1 WHERE booking_id = $2",
      [date, id]
    );
  },

  cancelBooking: (id) => {
    return pool.query(`DELETE FROM bookings WHERE booking_id = '${id}'`);
  },
};

module.exports = bookingModel;
