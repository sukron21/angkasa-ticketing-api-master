const {
  failed,
  success,
  succesWithToken,
} = require("../../helper/response.helper");
const userModel = require("../../model/user/user.model");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcryptjs");
const jwtToken = require("../../helper/auth.helper");
const cloudinary = require("../../helper/cloudinary")

const userController = {
  register: (req, res) => {
    try {
      const { username, email, phone, password } = req.body;
      const id = uuid();

      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          failed(res, err.message, "failed", "fail hash password");
        }
        console.log("ini di controller");

        const data = {
          id,
          username,
          email,
          phone,
          password: hash,
        };

        userModel
          .register(data)
          .then(() => {
            delete data.password;
            success(res, data, "success", "register success");
          })
          .catch((err) => {
            failed(res, err.message, "failed", "register fail");
          });
      });
    } catch (err) {
      failed(res, err.message, "failed", "internal server error");
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    userModel
      .checkEmail(email)
      .then((result) => {
        const user = result.rows[0];
        if (result.rowCount > 0) {
          bcrypt
            .compare(password, result.rows[0].password)
            .then(async (result) => {
              if (result) {
                const token = await jwtToken({
                  id: user.user_id,
                  email: user.email,
                });

                delete user.password;
                delete user.avatar;

                succesWithToken(
                  res,
                  { token, data: user },
                  "success",
                  "login success"
                );
              } else {
                // ketika password salah
                failed(res, null, "failed", "email or password is wrong");
              }
            });
        } else {
          //ketika username salah
          failed(res, null, "failed", "username wrong");
        }
      })
      .catch((err) => {
        failed(res, err, "failed", "internal server error");
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

  updateUser: async (req, res) => {
    const id = req.params.id;
    const date = new Date();
    let avatar;

    if (req.file) {
      avatar = await cloudinary.uploader.upload(req.file.path);
    }

    userModel
    .getUserDetail(id)
    .then(async (results) => {
      const datas = await results.rows[0]
      console.log("datas",datas)
      // console.log(datas)
      if(avatar !== undefined) {
        console.log('1')
        const public_id = datas.ava_pub_id;
        console.log(public_id)
        console.log(public_id)
        if(public_id !== null) {
          console.log('test')
          await cloudinary.uploader.destroy(public_id);
        }
      }
      console.log('2')
      let ava_pub_id, ava_url, ava_secure_url;
        if(avatar === undefined) {
          ava_pub_id = datas.ava_pub_id
          ava_url = datas.ava_url
          ava_secure_url = datas.ava_secure_url
        } else {
          ava_pub_id = avatar.public_id
          ava_url = avatar.url
          ava_secure_url = avatar.secure_url
        }
        const data = {
          id,
          date,
          username: req.body.username,
          email: req.body.email,
          phone: req.body.phone,
          city: req.body.city,
          address: req.body.address,
          postcode: req.body.postcode,
          avatar,
          ava_pub_id,
          ava_url,
          ava_secure_url,
        };
        console.log(data)
        userModel
          .updateUser(data)
          .then(async () => {
            const result = await userModel.getUserDetail(id);
            success(res, result.rows[0], "success", "data has been update");
          })
          .catch((err) => {
            failed(res, err.message, "failed", "internal server error");
          });
    })

    
  },

  deleteUser: async (req, res) => {
    const id = req.params.id;
    const data = await userModel.getUserDetail(id);
    const public_id = data.rows[0].ava_pub_id;
    console.log(public_id) 
    if(public_id !== null) {
      await cloudinary.uploader.destroy(public_id);
    }
    userModel
      .deleteUser(id)
      .then(() => {
        success(res, data.rows[0], "data has been deleted");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "internal server error");
      });
  },
  getAllUsers: async (req, res) => {
    try {
      userModel.getAllUsers()
        .then((results) => {
          success(res, results, "success", "get all users");
        })
        .catch((results) => {
          failed(res, results, "failed", "fail get all users");
        });
    } catch (err) {
      failed(res, err.message, "failed", "internal server error");
    }
  },
};

module.exports = userController;
