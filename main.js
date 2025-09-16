"use strict";

const express = require("express");
const mongoose = require("mongoose");
const deckRoutes = require("./routes/deckRoutes");
const flashcardRoutes = require("./routes/flashcardRoutes");
const authRoutes = require("./routes/authRoutes");
const errorControllers = require("./controllers/errorControllers");
const localDBUrl = "mongodb://localhost:27017/flashcards_db";

const app = express();

app.set("port", process.env.PORT || 3000);

mongoose.connect(localDBUrl);
let db = mongoose.connection;

db.once("open", () => {
    console.log("Database connected successfully");
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/auth", authRoutes);
app.use("/api/decks", deckRoutes);
app.use("/api/decks", flashcardRoutes);

app.use(errorControllers.notFoundError);
app.use(errorControllers.internalServerError);

app.listen(app.get("port"), () => {
    console.log(`Server running on http://localhost:${app.get("port")}`);
})