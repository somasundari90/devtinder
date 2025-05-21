const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const { singupDataValidator } = require("../utils/validation");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;
  try {
    //Validate the request data
    await singupDataValidator(req);

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

authRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();

      //Set Cookie and send in response
      res.cookie("token", token, { expires: new Date(Date.now() + 900000) });
      res.send("User login Successful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send(`Error: ${err.message}`);
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send("User logged out Successfully");
  } catch (err) {
    res.status(400).send(`Error: ${err.message}`);
  }
});

module.exports = authRouter;
