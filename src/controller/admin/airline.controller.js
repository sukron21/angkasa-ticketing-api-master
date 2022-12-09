const createError = require("http-errors");
const { v4: uuid } = require("uuid");
const { success, failed } = require("../../helper/response.helper");
const cloudinary = require("../../helper/cloudinary");
const airlineModel = require("../../model/admin/airline.model");

const airlineController = {
  insertAirline: async (req, res, next) => {
    try {
      const id = uuid();
      const { name } = req.body;
      let logo;

      if (req.file) {
        logo = await cloudinary.uploader.upload(req.file.path);
      }

      const logo_pub_id = logo.public_id;
      const logo_url = logo.url;
      const logo_secure_url = logo.secure_url;

      await airlineModel.insertAirline(id, logo, name, logo_pub_id, logo_url, logo_secure_url);

      success(res, { id, name, logo, logo_pub_id, logo_url, logo_secure_url }, "success", "insert airline success");
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  getAirline: async (req, res, next) => {
    try {
      const data = await airlineModel.getAirline();

      success(res, data.rows, "success", "get all airline success");
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  getAirlineDetail: async (req, res, next) => {
    try {
      const { id } = req.params;

      const data = await airlineModel.getAirlineDetail(id);

      success(res, data.rows[0], "success", "get airline detail success");
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  updateAirline: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      let logo;
      const date = new Date();
      
      const data = await airlineModel.getAirlineDetail(id);
      

      // console.log(public_id);

      if (req.file) {
        logo = await cloudinary.uploader.upload(req.file.path);
        // delete before image if user req new file
        const public_id = data.rows[0].logo_pub_id;
        console.log(public_id);
        if(public_id !== null) {
          // console.log('1')
          await cloudinary.uploader.destroy(public_id);
        }
      }

      const oldName = data.rows[0].name;
      let logo_pub_id, logo_url, logo_secure_url;
      console.log(logo)
      if(logo === undefined) {
        // console.log('2')
        logo_pub_id = data.rows[0].logo_pub_id;
        logo_url = data.rows[0].logo_url;
        logo_secure_url = data.rows[0].logo_secure_url;
      } else {
        // console.log('3')
        logo_pub_id = logo.public_id;
        logo_url = logo.url;
        logo_secure_url = logo.secure_url;
      }
      const datas = {
        id,
        logo,
        name,
        logo_pub_id,
        logo_url,
        logo_secure_url,
        date
      }
      // console.log("datas", datas)

      await airlineModel.updateAirline(datas)
      .then((results) => {
        success(res, results, "success", "success update data")
      })
      .catch((err) => {
        failed(res, err.message, "failed","failed update data")
      });
      // const result = await airlineModel.getAirlineDetail(id);

      // success(
      //   res,
      //   result.rows[0],
      //   "success",
      //   `${oldName} updated to ${result.rows[0]}`
      // );
    } catch (error) {
      failed(res, error.message, "failed", "internal server error")
      // next(new createError.InternalServerError());
    }
  },

  removeAirline: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await airlineModel.getAirlineDetail(id);
      const public_id = data.rows[0].logo_pub_id;
      console.log(public_id)
      if(public_id !== null) {
        await cloudinary.uploader.destroy(public_id);
      }
      const name = data.rows[0].name;

      await airlineModel.removeAirline(id);

      success(res, data.rows[0], "success", `${name} deleted`);
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },
};

module.exports = airlineController;
