const mongoose = require("mongoose");
const JokeSchema = mongoose.Schema(
  {
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const JokeModel = mongoose.model("Joke", JokeSchema);

module.exports = JokeModel;
