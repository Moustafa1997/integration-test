// 3rd party libraries
const express = require("express");
const bodyParser = require("body-parser");
const bookRouter = require("./routes/book-router");

// create app instance and get port
const app = express();

// configure app
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("hello");
});
// routes
app.use("/api/book", bookRouter);
module.exports = app;
