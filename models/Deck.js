"use strict";

const mongoose = require("mongoose");

const deckSchema = mongoose.Schema({
    title: {type: String, unique: true, maxlength: 20, required: true},
    description: {type: String, required: true},
    flashcards: [{type: mongoose.Schema.Types.ObjectId, ref: "Flashcard"}]
}, {timestamps: {createdAt: "created_at", updatedAt: "updated_at"}});

module.exports = mongoose.model("Deck", deckSchema);