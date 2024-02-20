const express = require("express");
const routes = require("./routes/index.js");
const e404Manipulate = require("./middlewares/e404Manipulate.js");
const errorsManipulate = require("./middlewares/errorsManipulate.js");

const app = express();
app.use(express.json());

routes(app);

app.use(e404Manipulate);
app.use(errorsManipulate);

module.exports = app;