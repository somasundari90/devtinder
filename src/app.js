const express = require("express");
const bcrypt = require("bcrypt");
const connectDB = require("./config/database");
const User = require("./models/user");
const { singupDataValidator } = require("./utils/validation");

const app = express();

app.use(express.json());

app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user?.password);
    if (isPasswordValid) {
      res.send("User login Successful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send(`Error Saving User: ${err.message}`);
  }
});

app.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;
  try {
    //Validate the request data
    singupDataValidator(req);

    //Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });
    await user.save();
    res.send("User added Successfully");
  } catch (err) {
    res.status(400).send(`Error Saving User: ${err.message}`);
  }
});

app.get("/user", async (req, res) => {
  try {
    /* this code block returns array of matched used
    const users = await User.find({ emailId: req.body.emailId });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    } */

    // This code returns the first document it finds
    const user = await User.findOne({ emailId: req.body.emailId });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send(`Something went wrong: ${err.message}`);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User Deleted Successfully");
  } catch (err) {
    res.status(404).send(`Error while Deleting User: ${err.message}`);
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["age", "gender", "skills", "photoUrl", "about"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error(
        "Updates not allowed for the few of the fields mentioned"
      );
    }
    const updatedData = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User Updated Successfully");
  } catch (err) {
    res.status(404).send(`Error while Updating User: ${err.message}`);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send(`Something went wrong: ${err.message}`);
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
