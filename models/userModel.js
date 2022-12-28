const mongoose = require("mongoose");
const validator = require("validator");
const CryptoJS = require("crypto-js");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Enter Valid Email Address...");
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Enter Strong PassWord.");
      }
    },
  },
});

// Validation For Unique UserName,Email,Mobile Number...
userSchema.path("email").validate(async (email) => {
  const userCount = await mongoose.models.User.countDocuments({ email });
  return !userCount;
}, "Email already Exists...");

//Pre Save Hashed Password
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await CryptoJS.AES.encrypt(
      user.password,
      "secretkey123"
    ).toString();
  }
  next();
});

//Login
userSchema.statics.findByCredentials = async (email, password) => {
  try {
    const userOne = await User.findOne({ email });
    if (!userOne) {
      throw new Error("Email is not Registered...");
    }

    var bytes1 = CryptoJS.AES.decrypt(userOne.password, "secretkey123");
    var orignalTextEmail = bytes1.toString(CryptoJS.enc.Utf8);

    if (orignalTextEmail === password) {
      return userOne;
    } else {
      throw new Error("incorrect Password...");
    }
  } catch (error) {
    const errMsg = error.message;
    return errMsg;
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
