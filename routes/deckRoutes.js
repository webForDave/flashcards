"use strict";

const Router = require("express").Router();
const deckControllers = require("../controllers/deckControllers");

Router.get("/@/:userID/decks", deckControllers.allDecks);
Router.get("/@/:userID/decks/:deckID/study", deckControllers.study);
Router.get("/@/:userID/decks/:deckID/progress", deckControllers.progress);
Router.post("/@/:userID/decks/create", deckControllers.createDeck);
Router.get("/@/:userID/decks/:deckID", deckControllers.deckDetail);
Router.put("/@/:userID/decks/:deckID/update", deckControllers.updateDeck);
Router.delete("/@/:userID/decks/:deckID/delete", deckControllers.deleteDeck);

module.exports = Router;
