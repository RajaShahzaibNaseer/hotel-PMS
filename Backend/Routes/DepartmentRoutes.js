import express from "express";
import BaseController from "../Controllers/BaseController";

const router = express.router;
const departmentController = new BaseController("departments");

router.get("/", departmentController.getAll);
router.get("/:id", departmentController.getOne);
router.post("/", departmentController.create);
router.put("/:id", departmentController.update);
router.delete("/:id", departmentController.delete);

module.exports = router;