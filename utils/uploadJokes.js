const connectDB = require("./connect");
const JokeModel = require("../models/joke.model");
require("dotenv").config();

const uploadJokes = async (jokes) => {
  try {
    await connectDB(process.env.URI);
    await JokeModel.create(jokes);
    console.log("✅", "Uploaded Successfully 🌟");
  } catch (e) {
    console.error("🟥", e);
  }
};

const getJokes = async () => {
  try {
    await connectDB(process.env.URI);
    console.log("✅", "CONNECTED SUCCESSFULLY !");
    const jokes = await JokeModel.find({});
    console.log("✅", "FETCHED SUCCESSFULLY");
    console.log("👉", { ...jokes });
  } catch (e) {
    console.error("🟥", e);
  }
};

module.exports = { uploadJokes, getJokes };
