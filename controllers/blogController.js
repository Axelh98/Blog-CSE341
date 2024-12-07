const Post = require('../models/post'); 

const createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body); 
    await newPost.save();
    res.status(201).json(newPost); 
  } catch (error) {
    res.status(400).json({ message: "Error creating post", error });
  }
};


// Obtain all posts
const getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find(); // Obtener todas las publicaciones
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching posts", error });
    }
  };


// Obtain a post by ID
const getPostById = async (req, res) => {
    const { id } = req.params; // El ID de la publicación
  
    try {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: "Error fetching post", error });
    }
  };
  

// Update a post by ID
const updatePost = async (req, res) => {
    const { id } = req.params;
  
    try {
      const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(400).json({ message: "Error updating post", error });
    }
  };

// Delete a post by ID
const deletePost = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedPost = await Post.findByIdAndDelete(id);
      if (!deletedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: "Error deleting post", error });
    }
  };

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};