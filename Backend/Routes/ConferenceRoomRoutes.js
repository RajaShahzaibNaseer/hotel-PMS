const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const conferenceRoomController = new BaseController("conferencerooms");

router.get("/", conferenceRoomController.getAll);
router.get("/:id", conferenceRoomController.getOne);
router.post("/", conferenceRoomController.create);
router.put("/:id", conferenceRoomController.update);
router.delete("/:id", conferenceRoomController.delete);

module.exports = router;