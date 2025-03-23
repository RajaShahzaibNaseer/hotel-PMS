const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const purchaseOrderController = new BaseController("purchaseorders");

router.get("/", purchaseOrderController.getAll.bind(purchaseOrderController));
router.get("/:id", purchaseOrderController.getOne.bind(purchaseOrderController));
router.post("/", purchaseOrderController.create.bind(purchaseOrderController));
router.put("/:id", purchaseOrderController.update.bind(purchaseOrderController));
router.delete("/:id", purchaseOrderController.delete.bind(purchaseOrderController));

module.exports = router;

