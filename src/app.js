const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

// ***************************** MIDDLEWARES & ERROR HANDLERS ******************************* START

// NO Response Handler - Goes into infinite loop
// app.use("/user", (req, res) => {});

//Multiple Route Handlers with next
// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("RH 1");
//     next();
//   },
//   (req, res) => {
//     res.send("Response 2");
//   }
// );

// Next with response in both RH handlers - sends res 2 and throws error in console
// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("RH 1");
//     next();
//     res.send("Response 1");
//   },
//   (req, res) => {
//     res.send("Response 2");
//   }
// );

//Multiple Routes with next

// app.get("/user", (req, res, next) => {
//   console.log("1st Route");
//   next();
// });
// app.get("/user", (req, res) => {
//   console.log("2st Route");
//   res.send("Response 2");
// });

// with / route and /user route
// app.use("/", (req, res) => {
//   res.send("Hello from /");
// });
// app.use("/user", (req, res) => {
//   res.send("Hello from /user");
// });

// with / route and /user route and next
// app.use("/", (req, res, next) => {
//   console.log("Hello from /");
//   next();
// });
// app.get("/user", (req, res) => {
//   res.send("Hello from /user");
// });

//MIDDLEWARES

// app.use("/admin", adminAuth);

// app.get("/user/login", (req, res) => {
//   res.send("User logged in successfully");
// });
//Order sequence matters
// app.get("/user", userAuth, (req, res) => {
//   res.send("User Auth checked and Data fetched");
// });

// app.get("/admin/getAllData", (req, res) => {
//   res.send("Fetched All data");
// });

// app.delete("/admin/deleteData", (req, res) => {
//   res.send("Deleted the admin");
// });

//ERROR Handlers
app.get("/admin/getAllData", (req, res) => {
  try {
    //Logic to get data from DB
    throw new Error("Some random error thrown");
    res.send("Fetched All data");
  } catch (err) {
    res.status(500).send("Error Handler from catch");
    // res.status(500).send(err.message);
  }
});

app.delete("/admin/deleteData", (req, res) => {
  //Logic to get data from DB
  throw new Error("Some random error thrown from Delete");
  res.send("Deleted the admin");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Somenthing went wrong");
    // res.status(500).send(err.message);
  }
});

// ***************************** MIDDLEWARES & ERROR HANDLERS ******************************* END

// app.get("/user", (req, res) => {
//   res.send({ firstName: "Soma", lastName: "A N" });
// });

// app.post("/user", (req, res) => {
//   res.send("User added Successfully");
// });

// app.delete("/user", (req, res) => {
//   res.send("User deleted Successfully");
// });

// app.use("/hello", (req, res) => {
//   res.send("Hello Hi!!");
// });

app.listen(3000, () => {
  console.log("Server is successfully listening");
});
