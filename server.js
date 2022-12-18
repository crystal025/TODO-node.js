const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(process.env.URL, (err, client) => {
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
  console.log(req.body.content);
  console.log(req.body.date);
});
