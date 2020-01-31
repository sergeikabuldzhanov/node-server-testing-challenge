const express = require("express");
const configureMiddleware = require("../middleware/configure-middleware");
const usersRouter = require("./users-router");

const server = express();
configureMiddleware(server);
server.use("/users", usersRouter);

module.exports = server;
