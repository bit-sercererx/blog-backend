const express = require("express");
const routes = express.Router();
const { singup, singin } = require("../controllres/User.controllre");
const { authenticateUser } = require("../middileware/auth");

routes.post("/singup", singup);
routes.post("/singin", authenticateUser, singin);

module.exports = routes;
