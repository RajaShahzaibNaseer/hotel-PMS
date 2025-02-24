const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const groupController = new BaseController("groups");

router.get("/", groupController.getAll);
router.get("/:id", groupController.getOne);
router.post("/", groupController.create);
router.put("/:id", groupController.update);
router.delete("/:id", groupController.delete);

module.exports = router;

