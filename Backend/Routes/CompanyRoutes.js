const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const companyController = new BaseController("companies");

router.get("/", companyController.getAll);
router.get("/:id", companyController.getOne);
router.post("/", companyController.create);
router.put("/:id", companyController.update);
router.delete("/:id", companyController.delete);

module.exports = router;

