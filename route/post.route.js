const express = require("express");
const router = express.Router();
const postController = require("./../controller/post.controller");


router.get("/pages/:page", postController.getAll);
router.get("/:id", postController.getById);

router.post("/", postController.create);
router.put("/:id", postController.update);
router.delete("/:id", postController.delete);

module.exports = router;
