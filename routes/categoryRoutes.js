const express = require("express");

const { requireAuth, requireAdmin } = require("../middlewares/requireAuth");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router.post("/category/create", requireAuth, requireAdmin, categoryController.createCategory);
router.get("/category/getAll", categoryController.getCategories);
router.patch("/category/update/:id", requireAuth, requireAdmin, categoryController.updateCategory);
router.delete("/category/delete/:slug", requireAuth, requireAdmin, categoryController.deleteCategory);

module.exports = router;