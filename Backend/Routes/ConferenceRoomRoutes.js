const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const conferenceRoomController = new BaseController("agents");

router.get("/", conferenceRoomController.getAll.bind(conferenceRoomController));
router.get("/:id", conferenceRoomController.getOne.bind(conferenceRoomController));
router.post("/", conferenceRoomController.create.bind(conferenceRoomController));
router.put("/:id", conferenceRoomController.update.bind(conferenceRoomController));
router.delete("/:id", conferenceRoomController.delete.bind(conferenceRoomController));

module.exports = router;

