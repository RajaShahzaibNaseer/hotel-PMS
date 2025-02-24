const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const roomController = new BaseController("rooms");

router.get("/", roomController.getAll);
router.get("/:id", roomController.getOne);
router.post("/", roomController.create);
router.put("/:id", roomController.update);
router.delete("/:id", roomController.delete);

module.exports = router;