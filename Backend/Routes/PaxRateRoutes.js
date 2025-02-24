const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const paxRateController = new BaseController("paxrates");

router.get("/", paxRateController.getAll);
router.get("/:id", paxRateController.getOne);
router.post("/", paxRateController.create);
router.put("/:id", paxRateController.update);
router.delete("/:id", paxRateController.delete);

module.exports = router;