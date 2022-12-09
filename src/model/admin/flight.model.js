const { response } = require("express");
const pool = require("../../config/db");

const flightModel = {
  getFlight: (data) => {
    return new Promise((resolve, reject) => {
      let query = {
        text: `
        SELECT flights.*, airlines.logo AS logo, airlines.name AS airline, airlines.logo_url as icon_airlines 
        FROM flights JOIN airlines USING (airline_id) 
        WHERE flights.departure_country ILIKE '%${data.dept_country}%'
        AND flights.departure_city ILIKE '%${data.dept_city}%'
        AND flights.arrival_country ILIKE '%${data.arrv_country}%'
        AND flights.arrival_city ILIKE '%${data.arrv_city}%'
        AND (flights.price >= ${data.min_price} AND flights.price <= ${data.max_price})
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
        SELECT flights.*, airlines.logo_url as icon_airlines, airlines.name FROM flights JOIN airlines USING (airline_id) WHERE flight_id = '${id}'
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

  getFlightFilter: (data) => {
    return new Promise((resolve, reject) => {
      console.log("model", data)
      const query = {
        text: `
        SELECT flights.*, airlines.logo_url, airlines.name as maskapai
        FROM flights JOIN airlines USING (airline_id)
        WHERE arrival_city ILIKE '%${data.arrival_city}%'
        AND departure_city ILIKE '%${data.departure_city}%'
        AND transit = ${data.transit}
        AND facilities = ${data.facilities}
        AND departure_time = ${data.departure_time}
        AND arrival_time = ${data.arrival_time}
        ORDER BY airlines.name ${data.sortby}
        `
      }
      pool.query(query, (err, res) => {
        if(err) {
          reject(err);
        } else {
          resolve(res)
        }
      })
    })
  },

  insertFlight: (data) => {
    return new Promise((resolve, reject) => {
      const query = {
        text: `INSERT INTO flights
                        (   
                          flight_id,
                          arrival_country, 
                          arrival_city, 
                          departure_country, 
                          departure_city,
                          arrival_time, 
                          departure_time, 
                          price,
                          airline_id, 
                          terminal, 
                          gate, 
                          transit, 
                          facilities
                        )
                        VALUES (
                            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
                        )`,
        values: [
          data.id,
          data.arrival_country,
          data.arrival_city,
          data.departure_country,
          data.departure_city,
          data.arrival_time,
          data.departure_time,
          data.price,
          data.airline_id,
          data.terminal,
          data.gate,
          data.transit,
          data.facilities,
        ],
      };
      pool.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  updateFlight: (data) => {
    return new Promise((resolve, reject) => {
      const query = {
        text: `UPDATE flights SET
                    arrival_country = COALESCE($1, arrival_country),
                    arrival_city = COALESCE($2, arrival_city),
                    departure_country = COALESCE($3, departure_country),
                    departure_city  = COALESCE($4, departure_city),
                    arrival_time = COALESCE($5, arrival_time),
                    departure_time = COALESCE($6, departure_time),
                    price = COALESCE($7, price),
                    terminal = COALESCE($8, terminal),
                    gate = COALESCE($9, gate),
                    transit = COALESCE($10, transit),
                    facilities = COALESCE($11, facilities),
                    airline_id = COALESCE($12, airline_id),
                    updated_at = $13
                    WHERE flight_id = $14`,
        values: [
          data.arrival_country,
          data.arrival_city,
          data.departure_country,
          data.departure_city,
          data.arrival_time,
          data.departure_time,
          data.price,
          data.terminal,
          data.gate,
          data.transit,
          data.facilities,
          data.airline_id,
          data.date,
          data.id,
        ],
      };
      pool.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  deleteFlight: (id) => {
    return new Promise((resolve, reject) => {
      const query = {
        text: "DELETE FROM flights WHERE flight_id = $1",
        values: [id],
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
