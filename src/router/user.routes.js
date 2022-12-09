const express = require("express");

const {
  register,
  login,
  getUserDetail,
  updateUser,
  deleteUser,
  getAllUsers
} = require("../controller/user/user.controller");
const upload = require("../middleware/upload.user");
// const remove = require("../middleware/delete.user");

const router = express.Router();

router
  .post("/register", register)
  .post("/login", login)
  .get("/:id", getUserDetail)
  .get("/users/list", getAllUsers)
  .put("/update/:id", upload, updateUser)
  .delete("/delete/:id", deleteUser);
module.exports = router;
