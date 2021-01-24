const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongo = require("mongodb").MongoClient;
const { ObjectID } = require("mongodb");
const url = process.env.MONGO_DB;
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
    const { email, password } = req.body;
    mongo.connect(url, (err, db) => {
      if (err) {
        res.sendStatus(503);
        return;
      }
      const dbo = db.db("ezgames");
      dbo
        .collection("users")
        .findOne({ email: email, password: password }, (err, result) => {
          if (err || !result) {
            res.sendStatus(400);
            return;
          }
          res.json(result);
        });
    });
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get("/games", async (req, res) => {
  try {
    mongo.connect(url, (err, db) => {
      if (err) {
        res.sendStatus(503);
        return;
      }
      const dbo = db.db("ezgames");
      dbo
        .collection("games")
        .find()
        .toArray((err, results) => {
          if (err) {
            res.sendStatus(400);
            return;
          }
          res.json(results);
        });
    });
  } catch (error) {
    res.sendStatus(500);
  }
});

app.put("/download/:id", async (req, res) => {
  try {
    const id = req.params.id;
    mongo.connect(url, (err, db) => {
      if (err) {
        res.sendStatus(503);
        return;
      }
      const dbo = db.db("ezgames");
      dbo
        .collection("games")
        .updateOne(
          { _id: ObjectID(id) },
          { $inc: { downloads: 1 } },
          (err, result) => {
            if (err) {
              res.sendStatus(400);
              return;
            }
            res.json(result);
          }
        );
    });
  } catch (error) {
    res.sendStatus(500);
  }
});

app.put("/user", async (req, res) => {
  try {
    const { user, game } = req.body;
    mongo.connect(url, (err, db) => {
      if (err) {
        res.sendStatus(503);
        return;
      }
      const dbo = db.db("ezgames");
      dbo
        .collection("users")
        .updateOne(
          { _id: ObjectID(user) },
          { $push: { games: game } },
          (err, results) => {
            if (err) {
              res.sendStatus(400);
              return;
            }
            res.json(results);
          }
        );
    });
  } catch (error) {
    res.sendStatus(500);
  }
});

app.listen(8080);
