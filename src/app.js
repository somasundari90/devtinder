const express = require("express");

const app = express();

app.use("/soma", (req, res) => {
  res.send("Hello from server");
});
app.use("/hello", (req, res) => {
  res.send("Hello Hi!!");
});
app.use("/", (req, res) => {
  res.send("Welcome Page");
});

app.listen(3000, () => {
  console.log("Server is successfully listening");
});
