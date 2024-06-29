const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (userCredentials) => {
  const payload = {
    id: userCredentials._id,
    userName: userCredentials.userName,
    email: userCredentials.email,
    fullName: userCredentials.fullName,
  };
  const token = jwt.sign(payload, process.env.SK);
  return token;
};

const singup = async (req, res, next) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPassword;
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
const singin = async (req, res, next) => {
  try {
    const payload = req.user;
    const token = generateToken(payload);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  singup,
  singin,
};
