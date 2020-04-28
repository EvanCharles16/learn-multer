const MenuSchema = require("../models/Menu");

module.exports = {
  create: (req, res) => {
    MenuSchema.create({
      name: req.body.name,
      detail: req.body.detail,
      price: req.body.price,
      category: req.body.category,
      imageURL: req.file && req.file.path,
    })
      .then((response) => res.json(response))
      .catch((err) => {
        throw err;
      });
  },

  getAllData: (req, res) => {
    MenuSchema.find({})
      .populate("category")
      .then((response) => res.json(response))
      .catch((err) => err);
  },
};
