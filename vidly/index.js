const express = require("express");
const genresRoutes = require("./routes/genres");
const customerRoutes = require("./routes/customers");
const { connectDB } = require("./utils");

const app = express();
app.use(express.json());

// routes
app.use("/api/genres", genresRoutes);
app.use("/api/customers", customerRoutes);

const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
