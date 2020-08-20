const moment = require("moment");

class Logger {
  constructor() {
    this.log = console.log;
  }

  get now() {
    return moment().format("hh:mm:ss");
  }

  error(error) {
    this.log(`[${this.now}][ERROR]: ${error}`);
  }

  connected() {
    this.log(`[${this.now}][MONGODB]: Connected to mongo`);
  }

  started(port) {
    this.log(`[${this.now}][APP]: Started on port: ${port}`);
  }
}

module.exports = Logger;
