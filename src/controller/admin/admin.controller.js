const createError = require("http-errors");
const { v4: uuid } = require("uuid");
const { hash, compare } = require("bcryptjs");
const jwtToken = require("../../helper/auth.helper");

const adminModel = require("../../model/admin/admin.model");
const { succesWithToken } = require("../../helper/response.helper");

const adminController = {
  register: async (req, res, next) => {
    try {
      const id = uuid();
      const { username, email, password } = req.body;
      const date = new Date();
      const hashedPassword = await hash(password, 10);

      await adminModel.register(id, username, email, hashedPassword, date);

      return res.json({
        msg: "admin account registered, please login to start managing flights",
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const data = await adminModel.emailCheck(email);
      const savedPassword = data.rows[0].password;
      console.log(password, savedPassword);

      const valid = await compare(password, savedPassword);
      console.log(valid);

      const token = await jwtToken({
        id: data.rows[0].admin_id,
        email: data.rows[0].email,
      });

      delete data.rows[0].password;

      if (valid) {
        succesWithToken(
          res,
          { token, data: data.rows[0] },
          "success",
          "login success"
        );
      }

      return res.json({
        msg: "invalid",
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },
};

module.exports = adminController;
