const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const agentController = new BaseController("agents");

router.get("/", agentController.getAll.bind(agentController));
router.get("/:id", agentController.getOne.bind(agentController));
router.post("/", agentController.create.bind(agentController));
router.put("/:id", agentController.update.bind(agentController));
router.delete("/:id", agentController.delete.bind(agentController));

module.exports = router;

