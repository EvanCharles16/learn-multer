const MenuSchema = require("../models/Menu");

module.exports = {
  create: (req, res) => {
    MenuSchema.create({
      name: req.body.name,
      detail: req.body.detail,
      price: req.body.price,
      imageURL: req.file && req.file.path,
    })
      .then((response) => res.json(response))
      .catch((err) => {
        throw err;
      });
  },

  getAllData: (req, res) => {
    MenuSchema.find({})
      .then((response) => res.json(response))
      .catch((err) => err);
  },

  // getDataById: (req, res) => {
  //   MenuSchema.findById({})
  //     .then((response) => res.json(response))
  //     .catch((err) => err);
  // },

  // deleteById: (req, res, next) => {
  //   MenuSchema.findByIdAndRemove({})
  //     .then((response) => res.json(response))
  //     .catch((err) => err);
  // },
};
