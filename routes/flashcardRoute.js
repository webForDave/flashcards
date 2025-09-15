"use strict";

const Router = require("express").Router();
const flashcardControllers = require("../controllers/flashcardControllers");

Router.get("/:deckTitle/flashcards", flashcardControllers.getFlashcards);
Router.post("/:deckTitle/flashcards/create", flashcardControllers.createFlashcard);
Router.get("/:deckTitle/flashcards/:flashcardID", flashcardControllers.flashcardDetail);
Router.put("/:deckTitle/flashcards/:flashcardID/update", flashcardControllers.updateFlashcard);
Router.delete("/:deckTitle/flashcards/:flashcardID/delete", flashcardControllers.deleteFlashcard);

module.exports = Router;