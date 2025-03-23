const express = require("express");
const BaseController = require("../Controllers/BaseController");

const router = express.Router();
const finishedGoodsController = new BaseController("finishedgoods");

router.get("/", finishedGoodsController.getAll.bind(finishedGoodsController));
router.get("/:id", finishedGoodsController.getOne.bind(finishedGoodsController));
router.post("/", finishedGoodsController.create.bind(finishedGoodsController));
router.put("/:id", finishedGoodsController.update.bind(finishedGoodsController));
router.delete("/:id", finishedGoodsController.delete.bind(finishedGoodsController));

module.exports = router;

