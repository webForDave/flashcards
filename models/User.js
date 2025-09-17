"use strict";

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true, lowercase: true, maxlength: 15},
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true, minlength: 6},
    decks: [{type: mongoose.Schema.Types.ObjectId, ref: "Deck"}]
}, {timestamps: {createdAt: "created_at", updatedAt: "updated_at"}});

module.exports = mongoose.model("User", userSchema);