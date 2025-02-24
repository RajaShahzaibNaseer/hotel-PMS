const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const roomTypeController = new BaseController("roomtypes");

router.get("/", roomTypeController.getAll);
router.get("/:id", roomTypeController.getOne);
router.post("/", roomTypeController.create);
router.put("/:id", roomTypeController.update);
router.delete("/:id", roomTypeController.delete);

module.exports = router;