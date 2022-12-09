/* eslint-disable camelcase */
const pool = require("../../config/db");

const userModel = {
  getUser: () => {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM users ORDER BY username ASC", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getUserDetail: (id) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM users where user_id='${id}'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
};
module.exports = userModel;
