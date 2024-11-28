const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Soma",
    lastName: "A N",
    emailId: "somaanand295@gmail.com",
    password: "somaanand",
    age: 34,
    gender: "female",
  };
  const user = new User(userObj);

  // await user.save();

  res.send("User added Successfully");
});

connectDB()
  .then(() => {
    console.log("DB Connection Established Successfully");
    app.listen(7777, () => {
      console.log("Server is successfully listening");
    });
  })
  .catch((err) => {
    console.log(err);
  });
