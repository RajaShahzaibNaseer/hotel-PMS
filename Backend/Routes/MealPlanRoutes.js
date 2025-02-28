const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const mealPlanController = new BaseController("mealplans");

router.get("/", mealPlanController.getAll.bind(mealPlanController));
router.get("/:id", mealPlanController.getOne.bind(mealPlanController));
router.post("/", mealPlanController.create.bind(mealPlanController));
router.put("/:id", mealPlanController.update.bind(mealPlanController));
router.delete("/:id", mealPlanController.delete.bind(mealPlanController));

module.exports = router;

