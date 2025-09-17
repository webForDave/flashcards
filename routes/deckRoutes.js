"use strict";

const Router = require("express").Router();
const deckControllers = require("../controllers/deckControllers");
const { protect } = require("../controllers/authMiddleware");

Router.get("/", protect, deckControllers.allDecks);
Router.get("/:deckID/study", protect, deckControllers.study);
Router.get("/:deckID/progress", protect, deckControllers.progress);
Router.post("/create", protect, deckControllers.createDeck);
Router.get("/:deckID", protect, deckControllers.deckDetail);
Router.put("/:deckID/update", protect, deckControllers.updateDeck);
Router.delete("/:deckID/delete", protect, deckControllers.deleteDeck);

module.exports = Router;
