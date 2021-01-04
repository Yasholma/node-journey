const Joi = require("joi");
const express = require("express");

const app = express();
app.use(express.json());

// data
const genres = [
  { id: 1, title: "Action" },
  { id: 2, title: "Adventure" },
  { id: 3, title: "Fantasy" },
  { id: 4, title: "Sport" },
];

// routes
app.get("/api/genres", (_req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const id = +req.params.id;
  const genre = genres.find((g) => g.id === id);
  if (!genre) return res.status(404).send("No genre with this ID is found");

  res.send(genre);
});

app.post("/api/genres", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    title: req.body.title,
  };

  genres.push(genre);

  res.status(201).send(genre);
});

app.put("/api/genres/:id", (req, res) => {
  const id = +req.params.id;
  const genre = genres.find((g) => g.id === id);
  if (!genre) return res.status(404).send("No genre with this ID is found");

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.title = req.body.title;

  res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
  const id = +req.params.id;
  const genre = genres.find((g) => g.id === id);
  if (!genre) return res.status(404).send("No genre with this ID is found");

  const index = genres.findIndex((g) => g.id === id);
  genres.splice(index, 1);

  res.status(204);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

function validateGenre(genre) {
  const schema = Joi.object({ title: Joi.string().min(3).required() });
  return schema.validate(genre);
}
