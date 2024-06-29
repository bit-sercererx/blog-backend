const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.authenticateUser = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ userName: req.body.userName });
    if (!foundUser) {
      const error = new Error("user name doesn't exist");
      error.status = 404;
      return next(error);
    }

    const comparedPassword = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );
    if (!comparedPassword) {
      const error = new Error("incorrect username or password");
      error.status = 400;
      return next(error);
    }
    req.user = foundUser;
    next();
  } catch (error) {
    next(error);
  }
};

const verifyAccessToken = async (token) => {
  try {
    const decodeData = jwt.verify(token, process.env.SK);
    return { success: true, data: decodeData };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

exports.authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "please log in to proceed" });
    }

    const result = await verifyAccessToken(token);
    if (!result.success) {
      return res.status(403).json({ error: result.error });
    }

    console.log(result);

    // if (Date.now() / 1000 > result.data.exp) {
    //   return res.sendStatus(401);
    // }
    req.user = result.data;
    next();
  } catch (error) {
    next(error);
  }
};
