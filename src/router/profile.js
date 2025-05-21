const express = require("express");
const bcrypt = require("bcrypt");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { resetPasswordValidator } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send(`Error in getting User Details: ${err.message}`);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const loggedInuser = req.user;
    const data = req.body;
    const ALLOWED_UPDATES = ["age", "gender", "skills", "photoUrl", "about"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error(
        `${req.user.firstName}, updates are not allowed for few fields mentioned`
      );
      // return res.status(400).send(`${req.user.firstName}, updates are not allowed for few fields mentioned`)    this also a method of sending the error
    }
    const updatedUserData = Object.keys(data).map(
      (key) => (loggedInuser[key] = req.body[key])
    );
    await loggedInuser.save();
    res.json({
      message: `${loggedInuser.firstName}, your profile updated successfully`,
      data: loggedInuser,
    });
  } catch (err) {
    res.status(404).send(`Error while Updating User: ${err.message}`);
  }
});

profileRouter.patch("/profile/passwordReset", userAuth, async (req, res) => {
  const { newPassword } = req.body;
  const loggedInuser = req.user;
  try {
    await resetPasswordValidator(newPassword, loggedInuser.password);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    loggedInuser.password = hashedPassword;
    await loggedInuser.save();
    res.send(`${loggedInuser.firstName}, your password updated Successfully`);
  } catch (err) {
    res.status(404).send(`Error while Updating User: ${err.message}`);
  }
});

module.exports = profileRouter;
