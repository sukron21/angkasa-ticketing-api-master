const express = require("express");

const {
  getUser,
  getUserDetail,
} = require("../../controller/admin/user.controller");
// const remove = require("../../middleware/delete.user");

const router = express.Router();

router
  .get("/", getUser)
  .get("/:id", getUserDetail);
module.exports = router;
