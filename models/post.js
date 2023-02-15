const mongoose = require("mongoose");

//Post schema
const postModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    vote: {
      type: [mongoose.Types.ObjectId],
      ref: "Vote",
    },
    imageUrl: {
      type: String,
      required: false,
    },
    comments: [
      {
        type: [mongoose.Types.ObjectId],
        ref: "Comment",
        required:false
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postModel);
