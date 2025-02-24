const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const guestController = new BaseController("guests");

router.get("/", guestController.getAll);
router.get("/:id", guestController.getOne);
router.post("/", guestController.create);
router.put("/:id", guestController.update);
router.delete("/:id", guestController.delete);

module.exports = router;

