const User = require("../models/Users");
const Bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = "secret";

const validateRegister = require("./../validator/register");

module.exports = {
  create: (req, res, next) => {
    const { err, isValid } = validateRegister(req.body);
    if (!isValid) {
      return res.status(400).json(err);
    }
    User.create({
      fullName: req.body.fullName,
      email: req.body.email,
      address: req.body.address,
      password: req.body.password,
    })
      .then((response) => res.json(response))
      .catch((err) => {
        throw err;
      });
  },

  authenticated: function (req, res, next) {
    User.findOne({ email: req.body.email })
      .then((response, err) => {
        if (err) next(err);
        else {
          if (
            response != null &&
            Bcrypt.compareSync(req.body.password, response.password)
          ) {
            jwt.sign(
              {
                id: response._id,
              },
              privateKey,
              { expiresIn: "1h" },
              (err, token) => {
                res.json(token);
              }
            );
          } else {
            res.json({ status: err });
          }
        }
      })
      .catch((err) => {
        throw err;
      });
  },

  getData: (req, res, next) => {
    User.find({})
      .then((response) => res.json(response))
      .catch((err) => err);
  },

  getDataById: (req, res, next) => {
    User.findById(req.params.userId)
      .then((response) => res.json(response))
      .catch((err) => {
        throw err;
      });
  },
};
