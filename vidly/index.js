const express = require("express");
const { connectDB } = require("./utils");
const genresRoutes = require("./routes/genres");
const customerRoutes = require("./routes/customers");
const movieRoutes = require("./routes/movies");
const rentalRoutes = require("./routes/rentals");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/genres", genresRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/rentals", rentalRoutes);

const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
