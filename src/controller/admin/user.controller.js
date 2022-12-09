const { failed, success } = require("../../helper/response.helper");
const userModel = require("../../model/admin/user.model");

const userController = {
  getUser: (req, res) => {
    userModel
      .getUser()
      .then((result) => {
        success(res, result.rows, "success", "get all user succes");
      })
      .catch((err) => {
        // res.json(err)
        failed(res, err.message, "failed", "get all user failed");
      });
  },

  getUserDetail: (req, res) => {
    const id = req.params.id;

    userModel
      .getUserDetail(id)
      .then((result) => {
        success(res, result.rows[0], "success", "request by id user success");
      })
      .catch((err) => {
        // res.json(err)
        failed(res, err.message, "failed", "request by id user failed");
      });
  },
};

module.exports = userController;
