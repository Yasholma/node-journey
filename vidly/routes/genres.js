const { Router } = require("express");
const { validateGenre } = require("../utils");
const Genre = require("../models/genre");

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const genres = await Genre.find();
    res.send(genres);
  } catch (error) {
    console.log(error);
    res.status(404).send("unable to fetch");
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const genre = await Genre.findById(id);
    if (!genre) return res.status(404).send("No genre with this ID is found");
    res.send(genre);
  } catch (error) {
    console.log({ error });
    res.send("No genre with this ID is found");
  }
});

router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const genre = new Genre({
      title: req.body.title,
    });

    await genre.save();

    res.status(201).send(genre);
  } catch (error) {
    console.log(error);
    res.send("Unable to create genre");
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const genre = await Genre.findByIdAndUpdate(
      { _id: id },
      {
        title: req.body.title,
      },
      { new: true }
    );

    if (!genre) return res.status(404).send("No genre with this ID is found");

    res.send(genre);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await Genre.deleteOne({ _id: id });

    res.status(204).send("");
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

module.exports = router;
