const validator = require("validator");

const singupDataValidator = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Please enter a valid Name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Please enter a valid email id");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

module.exports = { singupDataValidator };
