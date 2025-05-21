const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const authRouter = require("./router/auth");
const requestRouter = require("./router/request");
const profileRouter = require("./router/profile");
const userRouter = require("./router/user");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(authRouter);
app.use(requestRouter);
app.use(profileRouter);
app.use(userRouter);

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
