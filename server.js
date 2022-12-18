require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const MongoClient = require("mongodb").MongoClient;
app.set("view engine", "ejs");

const url = process.env.MONGO_URI;
let db;

app.use(express.static("public"));
app.use(express.json());

MongoClient.connect(`${url}`, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.log(err);
  }

  db = client.db("todo");

  app.listen(3000, () => {
    console.log("hello world!");
  });
});

app.get("/", (require, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.get("/write", (require, response) => {
  response.sendFile(__dirname + "/write.html");
});

app.post("/add", (req, res) => {
  res.send("전송 완료");
  db.collection("post").insertOne(
    { content: req.body.content, date: req.body.date },
    (err, result) => {
      console.log("저장 완료!");
    }
  );
});

app.get("/list", (req, res) => {
  db.collection("post")
    .find()
    .toArray((err, result) => {
      if (err) console.log(err);
      res.render("list.ejs", { todoList: result });
    });
});
