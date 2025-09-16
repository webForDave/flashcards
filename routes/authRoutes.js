"use srtict";

const Router = require("express").Router();
const authControllers = require("../controllers/authControllers");

Router.get("/users", authControllers.getUsers);
Router.get("/users/:userID", authControllers.getUser);
Router.post("/register", authControllers.register);
Router.post("/login", authControllers.login);
Router.delete("/users/:userID/delete", authControllers.deleteUser);

module.exports = Router;