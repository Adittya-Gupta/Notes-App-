const express = require("express");
const mongoose = require("mongoose");
const Note = require("./database/model");
const connectdb = require("./database/connection");
const app = express();
const port = 3000;
connectdb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  Note.find().sort({date:-1}).then((result) => {
    res.render("home", { notes: result });
  });
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/views/about.html");
});

app.get("/add", (req, res) => {
  res.sendFile(__dirname + "/views/add.html");
});

app.post("/", async (req, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);
});

app.post("/add", (req, res) => {
  const note = new Note({
    title: req.body.title,
    date: req.body.date,
    desc: req.body.desc,
  });
  note.save();
})

app.get("/notes/:id", (req, res) => {
  const id = req.params.id;
  Note.findById(id).then((result) => {
    res.render("details", { note: result });
  });
});

app.post("/notes/:id", (req, res) => {
  // console.log(req.body);
  // console.log(req.params.id);
  Note.findByIdAndUpdate(req.params.id, req.body)
  .then(result=>{
    res.json({redirect:'/'})
  })
  .catch(err=>{
    console.log(err);
  })
});

app.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  Note.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/" });
    })
    .catch((err) => {
      console.log(err);
    });
  });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
