"use strict";

const Router = require("express").Router();
const deckControllers = require("../controllers/deckControllers");

Router.get("/", deckControllers.allDecks);
Router.post("/create", deckControllers.createDeck);
Router.get("/:title", deckControllers.deckDetail);
Router.put("/:title/update", deckControllers.updateDeck);
Router.delete("/:title/delete", deckControllers.deleteDeck);

module.exports = Router;
