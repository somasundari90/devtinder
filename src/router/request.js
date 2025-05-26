const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // Creating New instance
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      // Case 1: Handle allowed status check
      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        throw new Error(`Status ${status} not supported`);
      }

      // Case 2: Validate toUserId if exists in DB
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: `User not found` });
      }

      // Case 3 and 4 Check for existing connection and if there is connection vice versa exists

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res.status(404).json({ message: `Connection Already Exists` });
      }

      const data = await connectionRequest.save();
      res.json({
        message:
          status === "interested"
            ? `${req.user.firstName} is ${status} in ${toUser.firstName} `
            : `${req.user.firstName}  ${status}  ${toUser.firstName} profile`,
        data,
      });
    } catch (err) {
      res.status(400).send(`Error in sending request: ${err.message}`);
    }
  }
);

module.exports = requestRouter;
