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

const userAuth = (req, res, next) => {
  const token = "xyz123";
  const isAuthenticated = token === "xyz";
  if (!isAuthenticated) {
    console.log("User not Authenticated");
    res.status(401).send("user Not Authorised");
  } else {
    console.log("User  Authenticated");
    next();
  }
};

module.exports = { adminAuth, userAuth };
