const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const groupController = new BaseController("groups");

router.get("/", groupController.getAll.bind(groupController));
router.get("/:id", groupController.getOne.bind(groupController));
router.post("/", groupController.create.bind(groupController));
router.put("/:id", groupController.update.bind(groupController));
router.delete("/:id", groupController.delete.bind(groupController));

module.exports = router;

