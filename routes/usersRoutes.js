const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.index);
router.post("/", userController.store);
router.get("/:id", userController.show);
router.delete("/:id", userController.destroy);
router.patch("/:id", userController.update);

module.exports = router;
