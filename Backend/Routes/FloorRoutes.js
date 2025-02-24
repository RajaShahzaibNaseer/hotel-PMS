const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const floorController = new BaseController("floors");

router.get("/", floorController.getAll);
router.get("/:id", floorController.getOne);
router.post("/", floorController.create);
router.put("/:id", floorController.update);
router.delete("/:id", floorController.delete);

module.exports = router;