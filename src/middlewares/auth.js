const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminAuth = (req, res, next) => {
  const token = "xyz123";
  const isAuthenticated = token === "xyz";
  if (!isAuthenticated) {
    console.log("Admin not Authenticated");
    res.status(401).send("Admin Not Authorised");
  } else {
    console.log("Admin  Authenticated");
    next();
  }
};

const userAuth = async (req, res, next) => {
  try {
    // Read the token
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }

    //Decode Token to get the secret hidden in it
    const decodedMessage = jwt.verify(token, "SomaChiruAnand1810!@$");
    const { _id } = decodedMessage;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("Invalid User login");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send(`Error in getting User Details: ${err.message}`);
  }
};

module.exports = { adminAuth, userAuth };
