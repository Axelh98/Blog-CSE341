const Reaction = require("../models/reactions");
const Post = require("../models/post");
const Comment = require("../models/comment");

exports.addReaction = async (req, res) => {
  try {
    const { type, targetId, targetType } = req.body;
    const userId = req.user.id; // ID del usuario autenticado

    // Validar targetType
    if (!["Post", "Comment"].includes(targetType)) {
      return res.status(400).json({ message: "Invalid target type" });
    }

    // Verificar si el objetivo existe
    const targetModel = targetType === "Post" ? Post : Comment;
    const target = await targetModel.findById(targetId);
    if (!target) {
      return res.status(404).json({ message: "Target not found" });
    }

    // Verificar si ya existe una reacción de este tipo por el usuario
    const existingReaction = await Reaction.findOne({
      user: userId,
      target: targetId,
      targetType,
      type,
    });

    if (existingReaction) {
      return res.status(400).json({ message: "Reaction already exists" });
    }

    // Crear nueva reacción
    const reaction = new Reaction({
      type,
      user: userId,
      target: targetId,
      targetType,
    });
    await reaction.save();

    res.status(201).json({ message: "Reaction added", reaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.removeReaction = async (req, res) => {
    try {
      const { id } = req.params; // ID de la reacción
      const userId = req.user.id; // ID del usuario autenticado
  
      const reaction = await Reaction.findById(id);
  
      if (!reaction) {
        return res.status(404).json({ message: "Reaction not found" });
      }
  
      if (reaction.user.toString() !== userId) {
        return res.status(403).json({ message: "Unauthorized action" });
      }
  
      await reaction.deleteOne();
  
      res.status(200).json({ message: "Reaction removed successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  