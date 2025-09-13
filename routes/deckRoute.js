"use strict";

const Router = require("express").Router();
const deckControllers = require("../controllers/deckControllers");

Router.get("/", deckControllers.allDecks);
Router.get("/:title", deckControllers.deckDetail);
Router.post("/new", deckControllers.createDeck);
Router.put("/update/:title", deckControllers.updateDeck);
Router.delete("/delete/:title", deckControllers.deleteDeck);

module.exports = Router;
