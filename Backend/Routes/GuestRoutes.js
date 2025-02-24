const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const guestController = new BaseController("agents");

router.get("/", guestController.getAll.bind(guestController));
router.get("/:id", guestController.getOne.bind(guestController));
router.post("/", guestController.create.bind(guestController));
router.put("/:id", guestController.update.bind(guestController));
router.delete("/:id", guestController.delete.bind(guestController));

module.exports = router;

