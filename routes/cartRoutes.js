const express = require("express");

const { requireAuth } = require("../middlewares/requireAuth");
const cartController = require("../controllers/cartController");

const router = express.Router();

router.post("/cart/add_to_cart", requireAuth, cartController.addToCart);

module.exports = router;