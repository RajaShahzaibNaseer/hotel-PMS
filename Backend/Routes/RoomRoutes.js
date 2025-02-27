const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const roomController = new BaseController("rooms");

router.get("/", roomController.getAll.bind(roomController));
router.get("/:id", roomController.getOne.bind(roomController));
router.post("/", roomController.create.bind(roomController));
router.put("/:id", roomController.update.bind(roomController));
router.delete("/:id", roomController.delete.bind(roomController));

module.exports = router;

