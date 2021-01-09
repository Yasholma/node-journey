const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect("mongodb://localhost/mongo-exercises", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error(`Unabled to connect to the database: ${error}`);
  }
}

// create schema
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  price: Number,
  date: {
    type: Date,
    default: Date.now(),
  },
  isPublished: { type: Boolean, default: false },
});

const Course = mongoose.model("Course", courseSchema);

// exercise one
async function getCourses() {
  try {
    return await Course.find({ isPublished: 1 })
      .sort({ name: 1 })
      .select({ name: 1, author: 1 });
  } catch (error) {
    console.log(`Unable to get courses: ${error.message}`);
  }
}

// exercise two
async function getMostExpensiveCourses() {
  try {
    return await Course.find({
      isPublished: true,
      tags: { $in: ["backend", "frontend"] },
    })
      .sort({ price: -1 })
      .select("name price author");
  } catch (error) {
    console.error(`Unable to get courses: ${error}`);
  }
}

// exercise three
async function getCoursesBy() {
  try {
    return await Course.find({ isPublished: true }).or([
      { name: /.*by.*/ },
      { price: { $gte: 15 } },
    ]);
  } catch (error) {
    console.error(`Unable to get courses: ${error}`);
  }
}

// connect
connectToDB();

// fetch courses
(async function () {
  const courses = await getCourses();
  console.log({ courses });
  const expensiveCourses = await getMostExpensiveCourses();
  console.log({ expensiveCourses });
  const byPrices = await getCoursesBy();
  console.log({ byPrices });
})();
