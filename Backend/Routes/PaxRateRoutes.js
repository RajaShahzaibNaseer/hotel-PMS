const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const paxRateController = new BaseController("agents");

router.get("/", paxRateController.getAll.bind(paxRateController));
router.get("/:id", paxRateController.getOne.bind(paxRateController));
router.post("/", paxRateController.create.bind(paxRateController));
router.put("/:id", paxRateController.update.bind(paxRateController));
router.delete("/:id", paxRateController.delete.bind(paxRateController));

module.exports = router;

