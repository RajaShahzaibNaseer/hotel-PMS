const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const userController = new BaseController("users");

router.get("/", userController.getAll.bind(userController));
router.get("/:id", userController.getOne.bind(userController));
router.post("/", userController.create.bind(userController));
router.put("/:id", userController.update.bind(userController));
router.delete("/:id", userController.delete.bind(userController));

module.exports = router;

