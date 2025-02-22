import express from "express";
import BaseController from "../Controllers/BaseController";

const router = express.router;
const agentController = new BaseController("agents");

router.get("/", agentController.getAll);
router.get("/:id", agentController.getOne);
router.post("/", agentController.create);
router.put("/:id", agentController.update);
router.delete("/:id", agentController.delete);

module.exports = router;

