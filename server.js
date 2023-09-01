const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;
const db = require("./db/db.json");
const fs = require("fs");
const crypto = require("crypto");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("/api/notes", (req, res) => {
  res.json(db);
});
app.post("/api/notes", (req, res) => {
  req.body.id = crypto.randomUUID();
  console.log(req.body);
  db.push(req.body);
  fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
    if (err) throw err;
  });
  res.json(db);
});
app.delete("/api/notes/:id", (req, res) => {
  deletedDB = db.filter((item) => item.id !== req.params.id);
  fs.writeFile("./db/db.json", JSON.stringify(deletedDB), (err) => {
    if (err) throw err;
  });
  res.json(deletedDB)
});

// app.delete('')
app.listen(PORT);
