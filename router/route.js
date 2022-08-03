const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");

router.get("/", postController.getAllPost);
router.post("/", postController.createPost);
router.get("/:id", postController.findPost, postController.getPost);
router.put("/:id", postController.findPost, postController.updatePost);
router.delete("/:id", postController.findPost, postController.deletePost);

module.exports = router;
