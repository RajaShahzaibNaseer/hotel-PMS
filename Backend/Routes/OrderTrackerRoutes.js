const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const orderTrackerController = new BaseController("ordertracker");

router.get("/", orderTrackerController.getAll.bind(orderTrackerController));
router.get("/:id", orderTrackerController.getOne.bind(orderTrackerController));
router.post("/", orderTrackerController.create.bind(orderTrackerController));
router.put("/:id", orderTrackerController.update.bind(orderTrackerController));
router.delete("/:id", orderTrackerController.delete.bind(orderTrackerController));

module.exports = router;

