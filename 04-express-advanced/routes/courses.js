const express = require("express");
const { validateCourse } = require("../utils/index");

const router = express.Router();

const courses = [
  { id: 1, name: "Laravel" },
  { id: 2, name: "Django" },
  { id: 3, name: "ASP.net" },
];

router.get("/", (_req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const id = +req.params.id;
  const course = courses.find((c) => c.id === id);
  if (!course)
    return res.status(404).send("The course with the given ID was not found");
  res.send(course);
});

router.post("/", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.status(201).send(course);
});

router.put("/:id", (req, res) => {
  const id = +req.params.id;
  const course = courses.find((c) => c.id === id);
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

router.delete("/:id", (req, res) => {
  const id = +req.params.id;
  const course = courses.find((c) => c.id === id);
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  const index = courses.findIndex((c) => c.id === id);
  courses.splice(index, 1);

  res.status(204).send("Deleted successfully");
});

module.exports = router;
