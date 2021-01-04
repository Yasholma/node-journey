const Joi = require("joi");
const express = require("express");

const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "Laravel" },
  { id: 2, name: "Django" },
  { id: 3, name: "ASP.net" },
];

app.get("/", (_req, res) => {
  res.send("Hello World!!!");
});

app.get("/api/courses", (_req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const id = +req.params.id;
  const course = courses.find((c) => c.id === id);
  if (!course)
    return res.status(404).send("The course with the given ID was not found");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.status(201).send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const id = +req.params.id;
  const course = courses.find((c) => c.id === id);
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const id = +req.params.id;
  const course = courses.find((c) => c.id === id);
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  const index = courses.findIndex((c) => c.id === id);
  courses.splice(index, 1);

  res.status(204).send("Deleted successfully");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on http://127.0.0.1:${port}`);
});

function validateCourse(course) {
  const schema = Joi.object({ name: Joi.string().min(3).required() });
  return schema.validate(course);
}
