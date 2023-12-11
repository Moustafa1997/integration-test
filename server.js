const mongoose = require("mongoose");
require("dotenv").config({
  path: "./config.env",
});
const app = require("./app");

const port = process.env.PORT || 8000;

//connect database

let db = process.env.DATABASE_LOCAL;

if (process.env.NODE_ENV === "testing") {
  db = process.env.DATABASE_TEST;
  Object.assign(process.env, {
    NODE_ENV: "testing",
    PORT: 5000,
  });
}
//p=log current env
const env = process.env.NODE_ENV;

// Connect to the database
mongoose
  .connect(db)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
const server=app.listen(port, () => {
  console.log(`server is running in ${env} environment on port ${port}`);
});
module.exports=server