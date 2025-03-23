const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const RecipeController = new BaseController("recipes");

router.get("/", RecipeController.getAll.bind(RecipeController));
router.get("/:id", RecipeController.getOne.bind(RecipeController));
router.post("/", RecipeController.create.bind(RecipeController));
router.put("/:id", RecipeController.update.bind(RecipeController));
router.delete("/:id", RecipeController.delete.bind(RecipeController));

module.exports = router;

