const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const stocksController = new BaseController("stocks");

router.get("/", stocksController.getAll.bind(stocksController));
router.get("/:id", stocksController.getOne.bind(stocksController));
router.post("/", stocksController.create.bind(stocksController));
router.put("/:id", stocksController.update.bind(stocksController));
router.delete("/:id", stocksController.delete.bind(stocksController));

module.exports = router;

