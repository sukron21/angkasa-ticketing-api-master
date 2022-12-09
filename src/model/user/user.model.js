/* eslint-disable camelcase */
const pool = require("../../config/db");

const userModel = {
  register: (data) => {
    return new Promise((resolve, reject) => {
      const query = {
        text: `INSERT INTO users
                (   
                    user_id,
                    username,
                    email,
                    phone,
                    password
                )
                VALUES (
                    $1, $2, $3, $4, $5
                )`,
        values: [data.id, data.username, data.email, data.phone, data.password],
      };
      pool.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  checkEmail: (email) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM users WHERE email='${email}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
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

  updateUser: (data) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `
        UPDATE users SET
        username = COALESCE ($1, username),
        email = COALESCE ($2, email),
        phone = COALESCE ($3, phone),
        avatar = COALESCE ($4, avatar),
        city = COALESCE ($5, city),
        address = COALESCE ($6, address),
        postcode = COALESCE ($7, postcode),
        ava_pub_id = COALESCE ($8, ava_pub_id),
        ava_url = COALESCE ($9, ava_url),
        ava_secure_url = COALESCE ($10, ava_secure_url),
        updated_at = $11
        WHERE user_id = $12
        `,
        [
          data.username,
          data.email,
          data.phone,
          data.avatar,
          data.city,
          data.address,
          data.postcode,
          data.ava_pub_id,
          data.ava_url,
          data.ava_secure_url,
          data.date,
          data.id,
        ],
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  deleteUser: (user_id) => {
    return new Promise((resolve, reject) => {
      const query = {
        text: "DELETE FROM users WHERE user_id = $1",
        values: [user_id],
      };
      pool.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      pool.query("select * from users order by username asc", (err, res) => {
        if(err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  }
};
module.exports = userModel;
