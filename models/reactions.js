const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["like", "love", "wow", "sad", "angry"], // Tipos permitidos
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    target: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "targetType",
    },
    targetType: {
      type: String,
      enum: ["Post", "Comment"], // Reaccionar a posts o comentarios
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reaction", reactionSchema);
