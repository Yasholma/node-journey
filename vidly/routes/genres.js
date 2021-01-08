const { Router } = require("express");
const { validateGenre } = require("../utils");

// data
const genres = [
  { id: 1, title: "Action" },
  { id: 2, title: "Adventure" },
  { id: 3, title: "Fantasy" },
  { id: 4, title: "Sport" },
];

const router = Router();

router.get("/", (_req, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
  const id = +req.params.id;
  const genre = genres.find((g) => g.id === id);
  if (!genre) return res.status(404).send("No genre with this ID is found");

  res.send(genre);
});

router.post("/", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    title: req.body.title,
  };

  genres.push(genre);

  res.status(201).send(genre);
});

router.put("/:id", (req, res) => {
  const id = +req.params.id;
  const genre = genres.find((g) => g.id === id);
  if (!genre) return res.status(404).send("No genre with this ID is found");

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.title = req.body.title;

  res.send(genre);
});

router.delete("/:id", (req, res) => {
  const id = +req.params.id;
  const genre = genres.find((g) => g.id === id);
  if (!genre) return res.status(404).send("No genre with this ID is found");

  const index = genres.findIndex((g) => g.id === id);
  genres.splice(index, 1);

  res.status(204);
});

module.exports = router;
