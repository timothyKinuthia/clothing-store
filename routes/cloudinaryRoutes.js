
const express = require("express");

const { requireAuth, requireAdmin } = require("../middlewares/requireAuth");
const cloudinaryController = require("../controllers/cloudinaryController");

const router = express.Router();

router.post("/images/upload", cloudinaryController.upload);

module.exports = router;