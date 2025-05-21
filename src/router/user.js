/** This router is not mentioned in the course.. keeping it here for reference */

const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");

userRouter.get("/user", async (req, res) => {
  try {
    /* this code block returns array of matched user
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

userRouter.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User Deleted Successfully");
  } catch (err) {
    res.status(404).send(`Error while Deleting User: ${err.message}`);
  }
});

userRouter.patch("/user/:userId", async (req, res) => {
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

userRouter.get("/feed", async (req, res) => {
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

module.exports = userRouter;
