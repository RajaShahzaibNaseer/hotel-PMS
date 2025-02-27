const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const departmentController = new BaseController("departments");

router.get("/", departmentController.getAll.bind(departmentController));
router.get("/:id", departmentController.getOne.bind(departmentController));
router.post("/", departmentController.create.bind(departmentController));
router.put("/:id", departmentController.update.bind(departmentController));
router.delete("/:id", departmentController.delete.bind(departmentController));

module.exports = router;

