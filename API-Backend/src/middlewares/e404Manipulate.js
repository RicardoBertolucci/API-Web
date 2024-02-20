const NotFound = require("../errors/NotFound.js");

function e404Manipulate(req, res, next) {
  const erro404 = new NotFound();
  next(erro404);
}

module.exports = e404Manipulate;