const mongoose = require("mongoose");
const {
  isAlphabetWithSpaceOnly,
  isNumericOnly,
  isValidEmail,
  isValidPassword,
} = require("../utils/utils");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 25,
      validate: {
        validator: (v) => isAlphabetWithSpaceOnly(v),
        message: (props) => `${props.value} is not a valid First Name!`,
      },
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 25,
      validate: {
        validator: (v) => isAlphabetWithSpaceOnly(v),
        message: (props) => `${props.value} is not a valid Last Name!`,
      },
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (v) => isValidEmail(v),
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (v) => isValidPassword(v),
        message: (props) => `${props.value} is not a valid Password!`,
      },
    },
    age: {
      type: Number,
      min: 18,
      validate: {
        validator: (v) => isNumericOnly(v),
        message: (props) => `${props.value} is not a valid Age!`,
      },
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: "{VALUE} is not supported",
      },
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
