const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
    generateContent,
    getJob,
} = require("../controllers/jobController");

router.post(
    "/generate",
    upload.single("image"),
    generateContent
);

router.get("/:id", getJob);

module.exports = router;