"use strict";

const Router = require("express").Router();
const deckControllers = require("../controllers/deckControllers");

Router.get("/", deckControllers.allDecks);
Router.get("/:title/study", deckControllers.study);
Router.get("/:title/progress", deckControllers.progress);
Router.post("/create", deckControllers.createDeck);
Router.get("/:title", deckControllers.deckDetail);
Router.put("/:title/update", deckControllers.updateDeck);
Router.delete("/:title/delete", deckControllers.deleteDeck);

module.exports = Router;
