import express from "express";
import BaseController from "../Controllers/BaseController";

const router = express.router;
const conferenceRoomController = new BaseController("conferencerooms");

router.get("/", conferenceRoomController.getAll);
router.get("/:id", conferenceRoomController.getOne);
router.post("/", conferenceRoomController.create);
router.put("/:id", conferenceRoomController.update);
router.delete("/:id", conferenceRoomController.delete);

module.exports = router;