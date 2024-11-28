const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added Successfully");
  } catch (err) {
    res.status(400).send(`Error Saving User: ${err.message}`);
  }
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
