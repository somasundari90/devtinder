const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({ firstName: "Soma", lastName: "A N" });
});

app.post("/user", (req, res) => {
  res.send("User added Successfully");
});

app.delete("/user", (req, res) => {
  res.send("User deleted Successfully");
});

app.use("/hello", (req, res) => {
  res.send("Hello Hi!!");
});

app.listen(3000, () => {
  console.log("Server is successfully listening");
});
