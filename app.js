const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const users = require('./routes/users')

mongoose
  .connect("mongodb://localhost/electricbillapp", {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("Database running"))
  .catch(err => console.log(`error starting database ${err}`));

app.use('/users', users)


app.get("/", (req, res) => {
  res.json("working brother");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
