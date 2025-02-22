import express from "express";
import BaseController from "../Controllers/BaseController";

const router = express.router;
const paxRateController = new BaseController("paxrates");

router.get("/", paxRateController.getAll);
router.get("/:id", paxRateController.getOne);
router.post("/", paxRateController.create);
router.put("/:id", paxRateController.update);
router.delete("/:id", paxRateController.delete);

module.exports = router;