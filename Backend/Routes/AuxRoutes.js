const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const auxController = new BaseController("services");

router.get("/", auxController.getAll.bind(auxController));
router.get("/:id", auxController.getOne.bind(auxController));
router.post("/", auxController.create.bind(auxController));
router.put("/:id", auxController.update.bind(auxController));
router.delete("/:id", auxController.delete.bind(auxController));

module.exports = router;

