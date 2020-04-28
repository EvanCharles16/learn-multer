const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/Category");

router.post("/create", categoryController.create);
router.get("/show", categoryController.getAllCategory);

module.exports = router;
