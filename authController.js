const { promisify } = require("util");
const User = require("./userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("./catchAsync");
const AppError = require("./appError");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

signToken = id => jwt.sign({ id }, process.env.JWT_SECRET);

exports.signup = catchAsync(async (req, res) => {
  const newUser = await User.create({
    // sans await ça s'affichera pas postman
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    user: { newUser }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Enter email or password"));
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password.", 400));
  }
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
    message: "You are logged in."
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged in", 401));
  }
  console.log(token);

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); //ici on vérifie si le token est valide

  console.log(decoded.id);

  //3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError(`This user doesn't exist`, 401));
  }

  //req.user = currentUser;
  next();
});
