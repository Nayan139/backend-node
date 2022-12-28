const User = require("../models/userModel");

exports.signupUser = async (req, res) => {
  try {
    const user = User(req.body);
    const userSave = await user.save();
    res
      .status(201)
      .send({ status: 201, message: "User created...", user: userSave });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({
      Status: 400,
      message: "Something went to wrong",
      error: error.errors,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    res.status(201).send({
      status: 201,
      message: typeof user === "object" ? "User Log in successfully..." : user,
      user: user,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({
      Status: 400,
      message: "Something went to wrong",
      error: error.errors,
    });
  }
};

exports.allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ status: 200, message: "User List...", user: users });
  } catch (error) {
    res.status(400).send({
      Status: 400,
      message: "Something went to wrong",
      error: error.errors,
    });
  }
};
