const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/", authController.token);
router.post("/adminToken", authController.adminToken);

module.exports = router;
