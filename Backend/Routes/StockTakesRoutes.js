const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const stockTakesController = new BaseController("stocktakes");

router.get("/", stockTakesController.getAll.bind(stockTakesController));
router.get("/:id", stockTakesController.getOne.bind(stockTakesController));
router.post("/", stockTakesController.create.bind(stockTakesController));
router.put("/:id", stockTakesController.update.bind(stockTakesController));
router.delete("/:id", stockTakesController.delete.bind(stockTakesController));

module.exports = router;

