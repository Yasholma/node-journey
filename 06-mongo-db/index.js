const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/moshcourse", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((error) => {
    console.error(`Couldn't connect to mongodb ${error}`);
  });

// creating schema
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 255 },
  author: String,
  category: {
    type: String,
    enum: ["web", "mobile", "network"],
    lowercase: true,
    // uppercase: true,
    trim: true,
  },
  tags: {
    type: Array,
    validate: {
      // isAsync: true,
      validator: (v, callback) => {
        // setTimeout(() => {
        //   const res = v && v.length > 0;
        //   callback(res);
        // }, 1000);
        return v && v.length > 0;
      },
      message: "A course should have at least one tag",
    },
  },
  date: { type: Date, default: Date.now() },
  isPublished: { type: Boolean, default: false },
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
});

// creating model
const Course = mongoose.model("Course", courseSchema);

// create
async function createCourse() {
  const course = new Course({
    name: "React Course",
    author: "Mosh",
    category: "Web",
    tags: ["frontend"],
    isPublished: true,
    price: 200.1,
  });

  try {
    // saving document
    const result = await course.save();
    console.log(result);
  } catch (error) {
    console.log(`${error.message}`);
  }
}

// read all
async function getCourses() {
  // comparison operators
  // eq => equal
  // ne => not equal
  // gt => greater than
  // gte => greather than or equal to
  // lt => less than
  // lte => less than or equal to
  // in => in
  // nin => not in

  // const results = await Course.find();
  // const results = await Course.find({ author: "Mosh" });

  // pagination
  const pageNumber = 2;
  const pageSize = 10;

  const results = await Course
    // .find({ author: "Mosh" })
    // .find({ price: { $gt: 10, $lte: 20 } })
    // .find({ price: { $in: [10, 15, 20] } })
    // .find({ name: "Mosh", isPublished: true })
    // .find()
    // .or([{ author: "Mosh", isPublished: true }])
    // .and([{ author: "Mosh", isPublished: true }]) // same as find with filter (line: 60)
    // regex: starts with mosh
    // .find({ author: /^Mosh/ })
    // regex: ends with hamedani
    // .find({ author: /Hamedani$/ })
    // regex: contains
    // .find({ author: /.*Mosh.*/ })
    // .find()
    // .limit(2)
    // .sort({ name: 1 })
    // .select({ name: 1, tags: 1 })
    // // return counts of document
    // .countDocuments();
    .find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);

  console.log(results);
}

// query first update approach: use when u want to prevent update based of a condition
// async function updateCourse(id) {
//   try {
//     const course = await Course.findById(id);
//     if (!course) return;
//     course.name = "New Author";
//     course.isPublished = true;
//     const res = await course.save();
//     console.log({ res });
//   } catch (error) {
//     console.log(`Unable to find course: ${error}`);
//   }
// }

// async function updateCourse(id) {
//   const result = await Course.findByIdAndUpdate(
//     { _id: id },
//     {
//       $set: {
//         author: "Jason",
//         isPublished: true,
//       },
//     },
//     {
//       new: true,
//     }
//   );

//   console.log(result);
// }

// remove document
async function removeCourse(id) {
  const res = await Course.deleteOne({ _id: id });
  console.log(res);
}

createCourse();
// getCourses();
// removeCourse("5ff8516411f37d4e15cf8740");
