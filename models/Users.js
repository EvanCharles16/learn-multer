const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Bcrypt = require("bcrypt");
const saltRounds = 8;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", function (next) {
  this.password = Bcrypt.hashSync(this.password, saltRounds);
  next();
});

module.exports = mongoose.model("user", userSchema);
