const { success, failed } = require("../../helper/response.helper");
const flightModel = require("../../model/user/flight.model");

const flightModelController = {
  getFlight: (req, res) => {
    const dept_country = req.body.dept_country || "";
    const dept_city = req.body.dept_city || "";
    const arrv_country = req.body.arrv_country || "";
    const arrv_city = req.body.arrv_city || "";
    const min_price = req.body.min_price || 0;
    const max_price = req.body.max_price || 99999999;
    const transit = req.query.transit || null;

    let wifi = null;
    if (req.query.wifi) {
      wifi = req.query.wifi || true;
    }

    let lunch = null;
    if (req.query.lunch) {
      lunch = req.query.lunch || true;
    }

    let luggage = null;
    if (req.query.luggage) {
      luggage = req.query.luggage || true;
    }

    const sortBy = req.query.sortby || "recipe_id";
    const sortOrder = req.query.order || "asc";

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    const searchData = {
      dept_country,
      dept_city,
      arrv_country,
      arrv_city,
      min_price,
      max_price,
      transit,
      wifi,
      lunch,
      luggage,
      sortBy,
      sortOrder,
      limit,
      offset,
    };

    flightModel
      .getFlight(searchData)
      .then((results) => {
        success(res, results.rows, "success", "success get data");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "internal server error");
      });
  },

  getFlightDetail: (req, res) => {
    const { id } = req.params;

    flightModel
      .getFlightDetail(id)
      .then((results) => {
        success(res, results.rows[0], "success", "success get data");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "internal server error");
      });
  },
};

module.exports = flightModelController;
