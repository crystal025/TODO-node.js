require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const url = process.env.MONGO_URI;
let db;

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
  res.send("db 전송 완료");
  db.collection("counter").findOne({ title: "forMakeId" }, (err, result) => {
    db.collection("post").insertOne(
      { _id: result.total, content: req.body.content, date: req.body.date },
      (err, result) => {
        console.log("db 저장 완료!");
        db.collection("counter").updateOne(
          { title: "forMakeId" },
          { $inc: { total: 1 } },
          (err, result) => {
            if (err) console.log(err);
          }
        );
      }
    );
  });
});

app.get("/list", (req, res) => {
  db.collection("post")
    .find()
    .toArray((err, result) => {
      if (err) console.log(err);
      res.render("list.ejs", { todoList: result });
    });
});

app.delete("/list", (req, res) => {
  req.body._id = parseInt(req.body._id);
  db.collection("post").deleteOne(req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("db 삭제 완료!");
      res.status(200).send({ message: "삭제에 성공하셨습니다!" });
    }
  });
});

app.get("/detail/:id", (req, res) => {
  db.collection("post").findOne(
    { _id: parseInt(req.params.id) },
    (err, result) => {
      if (result === null) {
        res.sendFile(__dirname + "/index.html");
      } else {
        res.render("detail.ejs", { data: result });
      }
    }
  );
});

app.get("/edit/:id", (req, res) => {
  db.collection("post").findOne(
    { _id: parseInt(req.params.id) },
    (err, result) => {
      if (result === null) {
        res.sendFile(__dirname + "/write.html");
      } else {
        res.render("edit.ejs", { data: result });
      }
    }
  );
});

app.put("/edit", (req, res) => {
  db.collection("post").updateOne(
    { _id: parseInt(req.body.id) },
    {
      $set: {
        _id: parseInt(req.body.id),
        content: req.body.content,
        date: req.body.date,
      },
    },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("db 수정 완료!");
        res.redirect("/list");
      }
    }
  );
});
