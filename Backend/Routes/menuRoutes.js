const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const menuController = new BaseController("menu");

router.get("/", menuController.getAll.bind(menuController));
router.get("/:id", menuController.getOne.bind(menuController));
router.post("/", menuController.create.bind(menuController));
router.put("/:id", menuController.update.bind(menuController));
router.delete("/:id", menuController.delete.bind(menuController));

module.exports = router;

