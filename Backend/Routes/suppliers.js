const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const supplierController = new BaseController("suppliers");

router.get("/", supplierController.getAll.bind(supplierController));
router.get("/:id", supplierController.getOne.bind(supplierController));
router.post("/", supplierController.create.bind(supplierController));
router.put("/:id", supplierController.update.bind(supplierController));
router.delete("/:id", supplierController.delete.bind(supplierController));

module.exports = router;

