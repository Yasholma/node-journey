const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: {
      type: [authorSchema],
      required: true,
    },
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  // const course = await Course.findById(courseId);
  // course.author.name = "John Doe";
  // const res = await course.save();
  // console.log(res);
  const res = await Course.updateOne(
    { _id: courseId },
    {
      $set: {
        "author.name": "Baddo Kings",
      },
    }
  );

  console.log(res);
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  try {
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId).remove();
    course.save();
  } catch (error) {
    console.log(error);
  }
}

// createCourse("Node Course", [
//   new Author({ name: "Mosh" }),
//   new Author({ name: "John" }),
// ]);
// updateAuthor("5ff97fd8e9687b1d18fe710f");
// addAuthor("5ff9829d9eabb31ee4fd96a1", new Author({ name: "Mary" }));
removeAuthor("5ff9829d9eabb31ee4fd96a1", "5ff9829d9eabb31ee4fd96a0");
