const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegister(data) {
  let err = {};

  data.fullName = !isEmpty(data.fullName) ? data.fullName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (Validator.isEmpty(data.fullName)) {
    err.fullName = "Full Name is Required";
  }

  if (Validator.isEmpty(data.email)) {
    err.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    err.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    err.password = "Password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    err.password2 = "Confirm Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 8, max: 15 })) {
    err.password = "Password must be at least 8 Characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    err.password2 = "Password must match";
  }

  return {
    err,
    isValid: isEmpty(err),
  };
};
