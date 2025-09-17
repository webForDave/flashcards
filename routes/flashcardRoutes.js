"use strict";

const Router = require("express").Router();
const flashcardControllers = require("../controllers/flashcardControllers");

Router.get("/@/:userID/decks/:deckID/flashcards", flashcardControllers.getFlashcards);
Router.post("/@/:userID/decks/:deckID/flashcards/create", flashcardControllers.createFlashcard);
Router.get("/@/:userID/decks/:deckID/flashcards/:flashcardID", flashcardControllers.flashcardDetail);
Router.put("/@/:userID/decks/:deckID/flashcards/:flashcardID/update", flashcardControllers.updateFlashcard);
Router.put("/@/:userID/decks/:deckID/flashcards/:flashcardID/mark/:status", flashcardControllers.mark);
Router.delete("/@/:userID/:deckID/flashcards/:flashcardID/delete", flashcardControllers.deleteFlashcard);

module.exports = Router;