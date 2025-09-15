"use strict";

const mongoose = require("mongoose");

const flashcardSchema = mongoose.Schema({
    question: {type: String, required: true, unique: true},
    answer: {type: String, required: true},
})

module.exports = mongoose.model("Flashcard", flashcardSchema);