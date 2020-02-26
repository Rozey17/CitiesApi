const City = require("./cityModel.js");
const catchAsync = require("./catchAsync");
const AppError = require("./appError");

exports.getAll = catchAsync(async (req, res) => {
  console.log(req.query);
  const queryObj = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach(el => delete queryObj[el]);
  const query = City.find(queryObj);
  const cities = await query;
  res.status(200).json({
    status: "success",
    result: cities.length,
    cities: { cities }
  });
});

exports.getCity = catchAsync(async (req, res, next) => {
  const city = await City.findById(req.params.id);
  if (!city) {
    return next(new AppError("cannot find this Id", 404));
  }
  res.status(200).json({
    status: "success",
    city: { city }
  });
});

exports.update = catchAsync(async (req, res) => {
  const city = await City.findByIdAndUpdate(req.params.id, req.body); //ne pas oublier req.body
  res.status(200).json({
    status: "success",
    city: { city }
  });
});

exports.delete = catchAsync(async (req, res) => {
  const city = await City.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    message: "City deleted successfully."
  });
});
