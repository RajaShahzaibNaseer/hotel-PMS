import express from "express";
import BaseController from "../Controllers/BaseController";

const router = express.router;
const mealPlanController = new BaseController("mealplans");

router.get("/", mealPlanController.getAll);
router.get("/:id", mealPlanController.getOne);
router.post("/", mealPlanController.create);
router.put("/:id", mealPlanController.update);
router.delete("/:id", mealPlanController.delete);

module.exports = router;