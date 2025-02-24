const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const auxController = new BaseController("auxilaryservices");

router.get("/", auxController.getAll);
router.get("/:id", auxController.getOne);
router.post("/", auxController.create);
router.put("/:id", auxController.update);
router.delete("/:id", auxController.delete);

module.exports = router;

