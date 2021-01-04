const EventEmitter = require("events");

const url = "http://mylogger.io/log";

class Logger extends EventEmitter {
  log(message) {
    // Send an HTTP request
    console.log(message);

    // raise an event
    this.emit("messageLogged");
    this.emit("logging", {
      id: 1,
      user: { name: "John Doe", email: "johndoe@gmail.com" },
    });

    return true;
  }
}

module.exports = Logger;
