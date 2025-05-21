const validator = require("validator");
const bcrypt = require("bcrypt");

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

const resetPasswordValidator = async (newPassword, oldPassword) => {
  const isSamePassword = await bcrypt.compare(newPassword, oldPassword);
  if (isSamePassword) {
    throw new Error("New password matches existing password");
  } else if (!validator.isStrongPassword(newPassword)) {
    throw new Error("Please enter a strong password");
  }
};
module.exports = { singupDataValidator, resetPasswordValidator };
