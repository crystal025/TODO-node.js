const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("hello world!");
});

app.get("/dog", (require, response) => {
  response.send("hello Dog!");
});

app.get("/rive", (require, response) => {
  response.send("hello Rive!");
});

app.get("/", (require, response) => {
  response.sendFile(__dirname + "/index.html");
});
