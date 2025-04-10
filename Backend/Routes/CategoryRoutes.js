const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const categoryController = new BaseController("categories");

router.get("/", categoryController.getAll.bind(categoryController));
router.get("/:id", categoryController.getOne.bind(categoryController));
router.post("/", categoryController.create.bind(categoryController));
router.put("/:id", categoryController.update.bind(categoryController));
router.delete("/:id", categoryController.delete.bind(categoryController));

module.exports = router;

