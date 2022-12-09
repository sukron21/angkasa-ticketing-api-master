const pool = require("../../config/db");

const bookingModel = {
  createBooking: (data) => {
    return pool.query(
      `
        INSERT INTO bookings (
          booking_id, 
          user_id, 
          flight_id, 
          airline_id, 
          psg_name, 
          psg_title, 
          psg_nationality, 
          travel_insurance, 
          payment_status, 
          total_payment) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
        `,
      [
        data.booking_id,
        data.user_id,
        data.flight_id,
        data.airline_id,
        data.psg_name,
        data.psg_title,
        data.psg_nationality,
        data.travel_insurance,
        data.payment_status,
        data.total,
      ]
    );
  },

  getMyBooking: (id) => {
    return pool.query(`
    SELECT bookings.*, flights.*, airlines.*, users.* FROM bookings 
    JOIN (flights join airlines using (airline_id)) using (flight_id) 
    JOIN users USING (user_id) WHERE user_id = '${id}'`);
  },

  getBookingDetail: (id) => {
    return pool.query(`
    SELECT bookings.*, flights.*, airlines.*, users.* FROM bookings 
    JOIN (flights join airlines using (airline_id)) using (flight_id)
    JOIN users using (user_id) WHERE booking_id = '${id}'
    `);
  },

  cancelBooking: (id) => {
    return pool.query(`DELETE FROM bookings WHERE booking_id = '${id}'`);
  },
};

module.exports = bookingModel;
