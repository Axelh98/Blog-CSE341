const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

// CRUD Routes

// Create a new user
router.post("/", userController.createUser);
// Get all users
router.get("/", userController.getAllUsers);
// Get a user by ID
router.get("/:id", userController.getUserById);

module.exports = router;
