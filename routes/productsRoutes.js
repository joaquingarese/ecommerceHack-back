const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.get("/", productController.index);
router.post("/", productController.store);
router.get("/:slug", productController.show);
router.delete("/:slug", productController.destroy);
router.patch("/:slug", productController.update);

module.exports = router;
