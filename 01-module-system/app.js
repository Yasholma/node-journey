// global.console.log("Hello");
// console.log(global);
// console.log(module);

/** imports */
const path = require("path");
const os = require("os");
const fs = require("fs");
const http = require("http");
// path
const pathObj = path.parse(__filename);
// console.log(pathObj);

// os
const totalMemory = os.totalmem();
const freeMemory = os.freemem();
// console.log(`Total Memory: ${totalMemory}`);
// console.log(`Free Memory: ${freeMemory}`);
// console.log(`Available Memory: ${totalMemory - freeMemory}`);

// file system (fs)
const filesSync = fs.readdirSync("./");
// console.log({ filesSync });
fs.readdir("./", (error, result) => {
  if (error) console.error(error);
  //   console.log({ result });
});

// Events
const Logger = require("./logger");
const logger = new Logger();

// listen
logger.on("messageLogged", () => {
  console.log("Something happened");
});

logger.on("logging", (data) => {
  console.log(data);
});

// console.log(logger.log("hello"));

// http
const server = http.createServer((_req, res) => {
  res.statusCode = 200;
  res.end("Hello World");
});

server.on("connection", (socket) => {
  console.log(socket);
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
