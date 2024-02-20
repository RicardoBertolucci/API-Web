const ErrorBase =  require("./ErrorBase.js");

class NotFound extends ErrorBase {
  constructor (message = "Page not found"){
    super(message, 404);
  }
}

module.exports = NotFound;