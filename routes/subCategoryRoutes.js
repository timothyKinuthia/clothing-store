const express = require("express");

const { requireAuth, requireAdmin } = require("../middlewares/requireAuth");
const subController = require("../controllers/subCategoryController");

const router = express.Router();

router.post("/sub-category/create", requireAuth, requireAdmin, subController.createSubCategory);
router.get("/sub-category/getAll", subController.getSubCategories);
router.patch("/sub-category/update/:id", requireAuth, requireAdmin,  subController.updateSub);
router.delete("/sub-category/delete/:slug", requireAuth, requireAdmin,  subController.deleteSub);

module.exports = router;