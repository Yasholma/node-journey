// global.console.log("Hello");
// console.log(global);
// console.log(module);

// const logger = require("./logger");
// console.log(logger.log("hello"));

/** imports */
const path = require("path");
const os = require("os");
const fs = require("fs");

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
console.log({ filesSync });
fs.readdir("./", (error, result) => {
  if (error) console.error(error);
  console.log({ result });
});
