const mongoose = require("mongoose");
const { genreSchema } = require("./genre");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: mongoose.Schema.Types.ObjectId, ref: "Genre", required: true },
  numberInStock: { type: Number, default: 0, min: 0, max: 255 },
  dailyRentalRate: { type: Number, default: 0, min: 0, max: 255 },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
