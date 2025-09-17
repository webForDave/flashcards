"use srtict";

const Router = require("express").Router();
const authControllers = require("../controllers/authControllers");
const { protect } = require("../controllers/authMiddleware");

Router.get("/users", protect, authControllers.getUsers);
Router.get("/users/:userID", protect, authControllers.getUser);
Router.post("/register", authControllers.register);
Router.post("/login", authControllers.login);
Router.delete("/users/:userID/delete", protect, authControllers.deleteUser);

module.exports = Router;