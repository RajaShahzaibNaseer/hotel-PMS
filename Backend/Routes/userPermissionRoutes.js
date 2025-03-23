const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const userPermissionController = new BaseController("userpermissions");

router.get("/", userPermissionController.getAll.bind(userPermissionController));
router.get("/:id", userPermissionController.getOne.bind(userPermissionController));
router.post("/", userPermissionController.create.bind(userPermissionController));
router.put("/:id", userPermissionController.update.bind(userPermissionController));
router.delete("/:id", userPermissionController.delete.bind(userPermissionController));

module.exports = router;

