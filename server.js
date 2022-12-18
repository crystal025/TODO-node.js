const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("hello world!");
});

app.get("/dog", (require, response) => {
  response.send("hello dog!");
});
