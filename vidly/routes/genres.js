const { Router } = require("express");
const { validateGenre } = require("../utils");
const Genre = require("../models/genre");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const asyncMiddleware = require("../middlewares/asyncMiddleware");

const router = Router();

router.get(
  "/",
  asyncMiddleware(async (_req, res) => {
    const genres = await Genre.find();
    res.send(genres);
  })
);

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

router.post("/", auth, async (req, res) => {
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

router.put("/:id", auth, async (req, res) => {
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

router.delete("/:id", [auth, admin], async (req, res) => {
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
