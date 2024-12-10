const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentsController");

// CRUD Routes

// Create a new comment
router.post("/:id", commentController.createComment);
// Get all comments
router.get("/", commentController.getAllComments);
// Get a comment by ID
router.get("/:id", commentController.getCommentById);
// Update a comment by ID
router.put("/:id", commentController.updateComment);
// Delete a comment by ID
router.delete("/:id", commentController.deleteComment);

module.exports = router;