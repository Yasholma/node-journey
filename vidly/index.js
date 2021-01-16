const app = require("express")();
const { loggers } = require("winston");

// logging errors
require("./startup/logging")();
// config
require("./startup/config")();
// connect to database
require("./startup/db").connectDB();
// routes
require("./startup/routes")(app);

// starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  loggers.get("vidly-log").info(`Server started on http://localhost:${PORT}`);
});
