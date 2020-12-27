const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongo = require("mongodb").MongoClient;
const url = "mongodb://35.232.154.17:27017/";
const app = new express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    mongo.connect(url, (err, db) => {
      if (err) {
        res.sendStatus(503);
        return;
      }
      const dbo = db.db("ezgames");
      dbo.collection("users").findOne({ email: email }, (err, result) => {
        if (err || result) {
          res.sendStatus(400);
          return;
        }
        const newUser = { email: email, password: password, games: [] };
        dbo.collection("users").insertOne(newUser, (err, result) => {
          if (err) {
            res.sendStatus(500);
          }
          db.close();
          res.json(result.ops[0]);
        });
      });
    });
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

app.put("/user", async (req, res) => {
  try {
    res.json({ message: "user" });
  } catch (error) {
    res.sendStatus(500);
  }
});

app.listen(8080);
