const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const jobTitleController = new BaseController("jobtitles");

router.get("/", jobTitleController.getAll);
router.get("/:id", jobTitleController.getOne);
router.post("/", jobTitleController.create);
router.put("/:id", jobTitleController.update);
router.delete("/:id", jobTitleController.delete);

module.exports = router;