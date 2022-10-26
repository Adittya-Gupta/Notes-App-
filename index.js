const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
app.use(express.urlencoded())

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/home.html");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/pages/about.html");
});

app.get("/add", (req, res) => {
  res.sendFile(__dirname + "/pages/add.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
