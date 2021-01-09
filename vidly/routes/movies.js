const { Router } = require("express");
const { validateMovie } = require("../utils");
const Movie = require("../models/movie");

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const movies = await Movie.find().populate("genre", "title");
    res.send(movies);
  } catch (error) {
    console.log(error);
    res.send("error");
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await Movie.findById(id).populate("genre", "title");
    if (!movie) return res.send("No movie with this ID found");
    res.send(movie);
  } catch (error) {
    console.error(error);
    res.send("error");
  }
});

router.post("/", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.send(error.details[0].message);

  try {
    const movie = new Movie({
      title: req.body.title,
      genre: req.body.genre,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    });

    const result = await movie.save();
    console.log("Saved");
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.send("error");
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await Movie.findById(id);
    if (!movie) return res.send("movie with this ID doesn't exist");

    movie.title = req.body.title || movie.title;
    movie.genre = req.body.genre || movie.genre;
    movie.numberInStock = req.body.numberInStock || movie.numberInStock;
    movie.dailyRentalRate = req.body.dailyRentalRate || movie.dailyRentalRate;

    const result = await movie.save();
    res.send(result);
  } catch (error) {
    console.error(error);
    res.send("error");
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Movie.deleteOne({ _id: id });
    if (!result.deletedCount)
      return res.send("movie with this ID doesn't exist");
    res.send("deleted");
  } catch (error) {
    console.error(error);
    res.send("error");
  }
});

module.exports = router;
