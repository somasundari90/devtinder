const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(`${user.firstName} sent Connection request`);
  } catch (err) {
    res.status(400).send(`Error in sending request: ${err.message}`);
  }
});

module.exports = requestRouter;
