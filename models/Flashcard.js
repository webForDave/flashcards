"use strict";

const mongoose = require("mongoose");

const flashcardSchema = mongoose.Schema({
    question: {type: String, required: true, unique: true},
    answer: {type: String, required: true},
    status: {type: String, default: "unknown"}
})

module.exports = mongoose.model("Flashcard", flashcardSchema);