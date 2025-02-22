import express from "express";
import BaseController from "../Controllers/BaseController";

const router = express.router;
const jobTitleController = new BaseController("jobtitles");

router.get("/", jobTitleController.getAll);
router.get("/:id", jobTitleController.getOne);
router.post("/", jobTitleController.create);
router.put("/:id", jobTitleController.update);
router.delete("/:id", jobTitleController.delete);

module.exports = router;