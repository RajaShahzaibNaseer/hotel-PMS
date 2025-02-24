const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const mealPlanController = new BaseController("mealplans");

router.get("/", mealPlanController.getAll);
router.get("/:id", mealPlanController.getOne);
router.post("/", mealPlanController.create);
router.put("/:id", mealPlanController.update);
router.delete("/:id", mealPlanController.delete);

module.exports = router;