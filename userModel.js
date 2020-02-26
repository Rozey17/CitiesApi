const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"]
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  password: {
    type: String,
    required: [true, "A password is required"],
    minlength: [8, "A password must have at least 8 characters"],
    maxlength: [25, "A password cannot have more than 25 characters"]
  },
  passwordConfirm: {
    type: String,
    required: [true, "You must confirm your password"],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: "Passwords dont match"
    },
    select: false
  }
});

userSchema.pre("save", async function(next) {
  // Only run this function if password is modified
  if (!this.isModified("password")) return next();
  // Hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
