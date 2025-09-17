"use strict";

const Router = require("express").Router();
const flashcardControllers = require("../controllers/flashcardControllers");
const { protect } = require("../controllers/authMiddleware");

Router.get("/:deckID/flashcards", protect, flashcardControllers.getFlashcards);
Router.post("/:deckID/flashcards/create", protect, flashcardControllers.createFlashcard);
Router.get("/:deckID/flashcards/:flashcardID", protect, flashcardControllers.flashcardDetail);
Router.put("/:deckID/flashcards/:flashcardID/update", protect, flashcardControllers.updateFlashcard);
Router.put("/:deckID/flashcards/:flashcardID/mark/:status", protect, flashcardControllers.mark);
Router.delete("/:deckID/flashcards/:flashcardID/delete", protect, flashcardControllers.deleteFlashcard);

module.exports = Router;