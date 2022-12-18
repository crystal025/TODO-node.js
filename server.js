const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("hello world!");
});

app.get("/", (require, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.get("/write", (require, response) => {
  response.sendFile(__dirname + "/write.html");
});

app.post("/add", (req, res) => {
  res.send("전송 완료");
});
