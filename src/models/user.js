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
      validate: {
        validator: (v) => v.length >= 3 && v.length <= 10,
        message: (props) =>
          `${props?.value?.length} records found, Please send Minimum 3 and Maximum 10 records!`,
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://png.pngtree.com/element_our/png/20181206/female-avatar-vector-icon-png_262142.jpg",
    },
    about: {
      type: String,
      maxLength: 255,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
