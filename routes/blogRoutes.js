// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const post = require('../controllers/blogController');

// Crear una nueva publicación
router.post('/', post.createPost);

// Obtener todas las publicaciones
router.get('/', post.getAllPosts);

// Obtener una publicación específica por su ID
router.get('/:id', post.getPostById);

// Actualizar una publicación
router.put('/:id', post.updatePost);

// Eliminar una publicación
router.delete('/:id', post.deletePost);

module.exports = router;
