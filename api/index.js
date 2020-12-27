const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const app = new express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

app.post("/signin", async (req, res) => {
  try {
    res.json({ message: "signin" });
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post("/login", async (req, res) => {
  try {
    res.json({ message: "login" });
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get("/games", async (req, res) => {
  try {
    res.json({ message: "games" });
  } catch (error) {
    res.sendStatus(500);
  }
});

app.put("/download", async (req, res) => {
  try {
    res.json({ message: "download" });
  } catch (error) {
    res.sendStatus(500);
  }
});

app.listen(8080);
