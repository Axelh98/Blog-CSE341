const Comment = require("../models/comments");
const Post = require("../models/post");
const User = require("../models/user");

exports.createComment = async (req, res) => {
  try {
    const { content, author } = req.body;
    const postId = req.params.id;

    // Validar datos requeridos
    if (!content || !author) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Obtener el post y el autor
    const post = await Post.findById(postId);
    const user = await User.findById(author);

    // Verificar si el post existe
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Verificar si el autor existe
    if (!user) {
      return res.status(404).json({ message: "Author not found" });
    }

    // Crear y guardar comentario
    const newComment = new Comment({ content, author, post });
    await newComment.save();

    res.status(201).json({
      message: "Comment created successfully",
      comment: { id: newComment._id, content: newComment.content },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    // Verificar si el comentario existe
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Actualizar el comentario
    const updatedComment = await Comment.findByIdAndUpdate(id, {
      content,
      updatedAt: Date.now(),
    });

    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el comentario existe
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Eliminar el comentario
    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};  