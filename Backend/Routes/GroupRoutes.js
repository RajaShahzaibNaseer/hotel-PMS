import express from "express";
import BaseController from "../Controllers/BaseController";

const router = express.router;
const groupController = new BaseController("groups");

router.get("/", groupController.getAll);
router.get("/:id", groupController.getOne);
router.post("/", groupController.create);
router.put("/:id", groupController.update);
router.delete("/:id", groupController.delete);

module.exports = router;

