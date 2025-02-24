const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const jobTitleController = new BaseController("agents");

router.get("/", jobTitleController.getAll.bind(jobTitleController));
router.get("/:id", jobTitleController.getOne.bind(jobTitleController));
router.post("/", jobTitleController.create.bind(jobTitleController));
router.put("/:id", jobTitleController.update.bind(jobTitleController));
router.delete("/:id", jobTitleController.delete.bind(jobTitleController));

module.exports = router;

