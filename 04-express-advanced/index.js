const debug = require("debug")("app:startup");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const express = require("express");
const { logMiddleware } = require("./middlewares/logger");
const { authMiddleware } = require("./middlewares/auth");
const homeRoutes = require("./routes/home");
const coursesRoutes = require("./routes/courses");

const app = express();

// configuration
console.log(`Application Name: ${config.get("name")}`);
console.log(`Mail Server: ${config.get("mail.host")}`);
// console.log(`Mail Server: ${config.get("mail.password")}`);

// middlewares
app.use(helmet());
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled...");
}

app.set("view engine", "pug");
app.set("views", "./views"); //default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(logMiddleware);
app.use(authMiddleware);

app.use("/", homeRoutes);
app.use("/api/courses", coursesRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on http://127.0.0.1:${port}`);
});
