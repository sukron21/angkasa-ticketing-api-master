const pool = require("../../config/db");

const flightModel = {
  getFlight: (data) => {
    return new Promise((resolve, reject) => {
      let query = {
        text: `
        SELECT * FROM flights WHERE 
        departure_country ILIKE '%${data.dept_country}%'
        AND departure_city ILIKE '%${data.dept_city}%'
        AND arrival_country ILIKE '%${data.arrv_country}%'
        AND arrival_city ILIKE '%${data.arrv_city}%'
        AND (price >= ${data.min_price} AND price <= ${data.max_price})
        `,
      };

      if (data.transit) {
        query.text = query.text + " " + `AND transit = ${data.transit}`;
      }

      if (data.wifi) {
        query.text = query.text + " " + ` AND wifi = ${data.wifi}`;
        console.log("nambah wifi");
        console.log(query);
      }

      if (data.lunch) {
        query.text = query.text + " " + ` AND lunch = ${data.lunch}`;
        console.log("nambah lunch");
        console.log(query);
      }

      if (data.luggage) {
        query.text = query.text + " " + ` AND luggage = ${data.luggage}`;
      }

      pool.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  
  getFlightDetail: (id) => {
    return new Promise((resolve, reject) => {
      const query = {
        text: `
        SELECT flights.*, airlines.* FROM flights JOIN airlines USING (airline_id) WHERE flight_id = '${id}'
        `,
      };
      pool.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
};

module.exports = flightModel;
