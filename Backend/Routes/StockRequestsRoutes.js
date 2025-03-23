const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const stockRequestController = new BaseController("stockrequests");

router.get("/", stockRequestController.getAll.bind(stockRequestController));
router.get("/:id", stockRequestController.getOne.bind(stockRequestController));
router.post("/", stockRequestController.create.bind(stockRequestController));
router.put("/:id", stockRequestController.update.bind(stockRequestController));
router.delete("/:id", stockRequestController.delete.bind(stockRequestController));

module.exports = router;

