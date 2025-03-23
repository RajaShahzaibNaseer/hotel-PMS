const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const itemController = new BaseController("items");

router.get("/", itemController.getAll.bind(itemController));
router.get("/:id", itemController.getOne.bind(itemController));
router.post("/", itemController.create.bind(itemController));
router.put("/:id", itemController.update.bind(itemController));
router.delete("/:id", itemController.delete.bind(itemController));

module.exports = router;

