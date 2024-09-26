const express = require("express");
const router = express.Router();
const commentController = require("./../controller/comment.controller");

router.post("/", commentController.create);
router.put("/:id", commentController.update);
router.delete("/:id", commentController.delete);

module.exports = router;