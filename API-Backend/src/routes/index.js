const express = require("express");
const contact = require("./contactRoute.js")

const routes = (app) => {
  app.use(
    express.json(),
    contact
  )
}

module.exports = routes;