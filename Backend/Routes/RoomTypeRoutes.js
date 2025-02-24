const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const roomTypeController = new BaseController("agents");

router.get("/", roomTypeController.getAll.bind(roomTypeController));
router.get("/:id", roomTypeController.getOne.bind(roomTypeController));
router.post("/", roomTypeController.create.bind(roomTypeController));
router.put("/:id", roomTypeController.update.bind(roomTypeController));
router.delete("/:id", roomTypeController.delete.bind(roomTypeController));

module.exports = router;

