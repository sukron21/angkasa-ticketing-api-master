const pool = require("../../config/db");

const airlineModel = {
  insertAirline: (id, logo, name, logo_pub_id, logo_url, logo_secure_url) => {
    return pool.query(
      `INSERT INTO airlines (airline_id, logo, name, logo_pub_id, logo_url, logo_secure_url )
        VALUES ($1, $2, $3, $4, $5, $6)`,
      [id, logo, name, logo_pub_id, logo_url, logo_secure_url]
    );
  },

  getAirline: () => {
    return pool.query("SELECT * FROM airlines");
  },

  getAirlineDetail: (id) => {
    return pool.query(`SELECT * FROM airlines WHERE airline_id = '${id}'`);
  },

  updateAirline: (data) => {
    return new Promise((resolve, reject) => {
      const query = {
        text: `UPDATE airlines SET
                    name = COALESCE($1, name),
                    logo = COALESCE($2, logo),   
                    logo_pub_id = COALESCE($3, logo_pub_id),
                    logo_url = COALESCE($4, logo_url),
                    logo_secure_url = COALESCE($5, logo_secure_url),
                    updated_at = $6
                    WHERE airline_id = $7`,
        values: [
          data.name,
          data.logo,
          data.logo_pub_id,
          data.logo_url,
          data.logo_secure_url,
          data.date,
          data.id
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

  removeAirline: (id) => {
    return pool.query(`DELETE FROM airlines WHERE airline_id = '${id}'`);
  },
};

module.exports = airlineModel;
