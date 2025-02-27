const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const floorController = new BaseController("floors");

router.get("/", floorController.getAll.bind(floorController));
router.get("/:id", floorController.getOne.bind(floorController));
router.post("/", floorController.create.bind(floorController));
router.put("/:id", floorController.update.bind(floorController));
router.delete("/:id", floorController.delete.bind(floorController));

module.exports = router;

