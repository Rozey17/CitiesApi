const City = require("./cityModel.js");

exports.getAll = async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json({
      status: "success",
      cities: { cities }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    res.status(200).json({
      status: "success",
      city: { city }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.update = async (req, res) => {
  try {
    const city = await City.findByIdAndUpdate(req.params.id, req.body); //ne pas oublier req.body
    res.status(200).json({
      status: "success",
      city: { city }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "City deleted successfully."
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};
