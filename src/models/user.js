const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const {
  isAlphabetWithSpaceOnly,
  isNumericOnly,
  isValidEmail,
  isValidPassword,
} = require("../utils/utils");
const validator = require("validator");
const { default: isURL } = require("validator/lib/isURL");

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
        validator: (v) => validator.isEmail(v),
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validator.isStrongPassword(v),
        message: (props) => `${props.value} is not a valid email!`,
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
      // validate: {
      //   validator: (v) => v.length >= 3 && v.length <= 10,
      //   message: (props) =>
      //     `${props?.value?.length} records found, Please send Minimum 3 and Maximum 10 records!`,
      // },
    },
    photoUrl: {
      type: String,
      default:
        "https://png.pngtree.com/element_our/png/20181206/female-avatar-vector-icon-png_262142.jpg",
      validate: {
        validator: (v) => validator.isURL(v),
        message: (props) => `${props.value} is not a valid URL!`,
      },
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

userSchema.methods.getJWT = async function () {
  //Always use the old function syntax
  const user = this;
  //Create token
  const token = await jwt.sign({ _id: user._id }, "SomaChiruAnand1810!@$", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (password) {
  //Always use the old function syntax
  const user = this;
  //validate password
  const isPasswordValid = await bcrypt.compare(password, this?.password);
  return isPasswordValid;
};
module.exports = mongoose.model("User", userSchema);
