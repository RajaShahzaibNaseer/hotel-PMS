const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.router;
const blockController = new BaseController("blocks");

router.get("/", blockController.getAll);
router.get("/:id", blockController.getOne);
router.post("/", blockController.create);
router.put("/:id", blockController.update);
router.delete("/:id", blockController.delete);

module.exports = router;