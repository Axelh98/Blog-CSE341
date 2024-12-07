// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const post = require('../controllers/blogController');

// Crear una nueva publicación
router.post('/posts', post.createPost);

// Obtener todas las publicaciones
router.get('/posts', post.getAllPosts);

// Obtener una publicación específica por su ID
router.get('/posts/:id', post.getPostById);

// Actualizar una publicación
router.put('/posts/:id', post.updatePost);

// Eliminar una publicación
router.delete('/posts/:id', post.deletePost);

module.exports = router;
