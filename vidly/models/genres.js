const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;
