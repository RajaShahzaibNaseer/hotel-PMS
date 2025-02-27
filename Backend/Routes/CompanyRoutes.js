const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const companyController = new BaseController("company");

router.get("/", companyController.getAll.bind(companyController));
router.get("/:id", companyController.getOne.bind(companyController));
router.post("/", companyController.create.bind(companyController));
router.put("/:id", companyController.update.bind(companyController));
router.delete("/:id", companyController.delete.bind(companyController));

module.exports = router;

