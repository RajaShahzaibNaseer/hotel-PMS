const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const foodSymbolController = new BaseController("foodsymbols");

router.get("/", foodSymbolController.getAll.bind(foodSymbolController));
router.get("/:id", foodSymbolController.getOne.bind(foodSymbolController));
router.post("/", foodSymbolController.create.bind(foodSymbolController));
router.put("/:id", foodSymbolController.update.bind(foodSymbolController));
router.delete("/:id", foodSymbolController.delete.bind(foodSymbolController));

module.exports = router;

