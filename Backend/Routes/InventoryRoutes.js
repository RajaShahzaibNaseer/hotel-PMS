const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const inventoryController = new BaseController("inventory");

router.get("/", inventoryController.getAll.bind(inventoryController));
router.get("/:id", inventoryController.getOne.bind(inventoryController));
router.post("/", inventoryController.create.bind(inventoryController));
router.put("/:id", inventoryController.update.bind(inventoryController));
router.delete("/:id", inventoryController.delete.bind(inventoryController));

module.exports = router;

