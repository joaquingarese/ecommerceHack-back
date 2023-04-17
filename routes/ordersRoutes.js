const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

router.get("/", /*ensureAuthenticated,*/ orderController.index);
router.post("/", ensureAuthenticated, orderController.store);
router.get("/:id", orderController.show);
router.delete("/:id", /* ensureAuthenticated, */ orderController.destroy);
router.patch("/:id", /* ensureAuthenticated, */ orderController.update);

module.exports = router;
