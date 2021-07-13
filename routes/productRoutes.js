
const express = require("express");

const { requireAuth, requireAdmin } = require("../middlewares/requireAuth");
const productController = require("../controllers/productController");

const router = express.Router();

router.post("/product/create", requireAuth, requireAdmin, productController.createProduct);

module.exports = router;