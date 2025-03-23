const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const ingredientsController = new BaseController("ingredients_subrecipes");

router.get("/", ingredientsController.getAll.bind(ingredientsController));
router.get("/:id", ingredientsController.getOne.bind(ingredientsController));
router.post("/", ingredientsController.create.bind(ingredientsController));
router.put("/:id", ingredientsController.update.bind(ingredientsController));
router.delete("/:id", ingredientsController.delete.bind(ingredientsController));

module.exports = router;

