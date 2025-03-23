const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const ItemModifierController = new BaseController("itemmodifier");

router.get("/", ItemModifierController.getAll.bind(ItemModifierController));
router.get("/:id", ItemModifierController.getOne.bind(ItemModifierController));
router.post("/", ItemModifierController.create.bind(ItemModifierController));
router.put("/:id", ItemModifierController.update.bind(ItemModifierController));
router.delete("/:id", ItemModifierController.delete.bind(ItemModifierController));

module.exports = router;

