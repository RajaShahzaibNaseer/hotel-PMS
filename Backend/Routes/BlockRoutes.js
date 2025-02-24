const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const blockController = new BaseController("blocks");

router.get("/", blockController.getAll.bind(blockController));
router.get("/:id", blockController.getOne.bind(blockController));
router.post("/", blockController.create.bind(blockController));
router.put("/:id", blockController.update.bind(blockController));
router.delete("/:id", blockController.delete.bind(blockController));

module.exports = router;
