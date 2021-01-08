const express = require("express");
const genresRoutes = require("./routes/genres");

const app = express();
app.use(express.json());

// routes
app.use("/api/genres", genresRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
