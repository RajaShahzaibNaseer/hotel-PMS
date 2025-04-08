const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const measurementController = new BaseController("measurementUnits");

router.get("/", measurementController.getAll.bind(measurementController));
router.get("/:id", measurementController.getOne.bind(measurementController));
router.post("/", measurementController.create.bind(measurementController));
router.put("/:id", measurementController.update.bind(measurementController));
router.delete("/:id", measurementController.delete.bind(measurementController));

module.exports = router;

