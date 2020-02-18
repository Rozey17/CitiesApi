const User = require("./userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("./catchAsync");

signToken = id => jwt.sign({ id }, process.env.JWT_SECRET);

exports.signup = catchAsync(async (req, res) => {
  const newUser = await User.create({
    // sans await ça s'affichera pas postman
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  const token = signToken({ id: newUser._id });

  res.status(201).json({
    status: "success",
    token,
    user: { newUser }
  });
});
