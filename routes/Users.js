const express = require("express");
const router = express.Router();
const userController = require("../controllers/Users");

router.post("/register", userController.create);
router.post("/login", userController.authenticated);
router.get("/", userController.getData);
router.get("/:userId", userController.getDataById);

module.exports = router;
