/** This router is not mentioned in the course.. keeping it here for reference */

const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName age gender skills photoUrl";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    // }).populate("fromUserId", ["firstname", "lastName", "age", "gender", "skills", "photoUrl"]);
    res.json({
      message: "Connection Data fetched successfully",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send(`Error in sending request: ${err.message}`);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connections = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);
    const data = connections?.map((eachConnection) => {
      // if (eachConnection._id.equals(loggedInUser._id)) { CAN BE USED LIKE THIS AS WELL
      if (eachConnection._id.toString() === loggedInUser._id.toString()) {
        return eachConnection.toUserId;
      }
      return eachConnection.fromUserId;
    });

    res.json({
      message: `${req.user.firstName} your connections fetched Successfully!`,
      data,
    });
  } catch (err) {
    res.status(400).send(`Error in sending request: ${err.message}`);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;

    const skip = (page - 1) * limit;

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserid: loggedInUser._id }, { toUserid: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests?.forEach((request) => {
      hideUsersFromFeed.add(request.fromUserId.toString());
      hideUsersFromFeed.add(request.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json({ data: users });
  } catch (err) {
    res.status(400).send(`Error in sending request: ${err.message}`);
  }
});

module.exports = userRouter;
