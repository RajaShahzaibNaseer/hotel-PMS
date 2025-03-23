const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const stockTransferController = new BaseController("stocktransfers");

router.get("/", stockTransferController.getAll.bind(stockTransferController));
router.get("/:id", stockTransferController.getOne.bind(stockTransferController));
router.post("/", stockTransferController.create.bind(stockTransferController));
router.put("/:id", stockTransferController.update.bind(stockTransferController));
router.delete("/:id", stockTransferController.delete.bind(stockTransferController));

module.exports = router;

