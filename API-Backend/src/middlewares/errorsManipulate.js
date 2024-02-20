/* eslint-disable no-unused-vars */
const ErrorBase = require("../errors/ErrorBase.js");

function errorsManipulate(err, req, res, next) {
  if (err instanceof ErrorBase){
    err.sendAnswer(res);
  } else {
    new ErrorBase().sendAnswer(res);
  }
}
module.exports = errorsManipulate;