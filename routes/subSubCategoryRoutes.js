const express = require('express');

const { requireAuth, requireAdmin } = require("../middlewares/requireAuth");
const subSubController = require("../controllers/subSubCategoryController");

const router = express.Router();

router.post("/sub-sub-category/create", requireAuth, requireAdmin, subSubController.createSubSubCategory);
router.get("/sub-sub-category/getAll", subSubController.getSubSubCategories);
router.patch("/sub-sub-category/update/:id", requireAuth, requireAdmin,  subSubController.updateSubSub);
router.delete("/sub-sub-category/delete/:slug", requireAuth, requireAdmin, subSubController.deleteSubSub);;


module.exports = router;