"use strict";

const Deck = require("../models/Deck");
const Flashcard = require("../models/Flashcard");
const User = require("../models/User");

const getDeck = async (req, res, next) => {
    try{
        /**
         * Utility function to fetch a deck from the database
         * Also gets (populates) the flashcards objects array not their IDs
         */

        // query the database to find a deck with id: deckID & (populate) the actual array of flashcards not their IDs
        let deck = await Deck.findOne({_id: req.params.deckID}).populate("flashcards");

        // return "error" if no deck is found
        if (!deck) return;
        return deck;
    } catch (error) {
        next(error);
    }
}

const getUser = async (userID) => {
    /**
     * Utility function to get a user from the database
     * Also gets (populates) the actual decks arrays from the user decks field 
     */
    let user = await User.findOne({_id: userID}).populate("decks");

    // return "error" if no user matches the filter
    if (!user) return;
    return user
}

const getFlashcards = async (req, res, next) => {
    try {
        let deck = await getDeck(req, res, next);
        let user = await getUser(req.user.id);

        if (!deck) return res.status(404).json({error: "Deck not found"});
        if (!user) return res.status(401).json({error: "User not found "});

        return res.status(200).json({
            deck: deck.title,
            flashcards: deck.flashcards
        })
    } catch (error) {
        next(error)
    }
}

const createFlashcard = async (req, res, next) => {
    try {
        const deck = await getDeck(req, res, next);
        const user = await getUser(req.user.id);

        if (!deck) return res.status(404).json({error: "Deck not found"});
        if (!user) return res.status(401).json({error: "User not found "});

        if (!req.body || !req.body.question || !req.body.answer || req.body.question.trim() == "" || req.body.answer.trim() == "") {
            return res.status(400).json({
                error: "A flashcard question and its answer must be provided"
            });
        }
        const {question, answer} = req.body;

        let flashcard = await Flashcard.create({question: question, answer: answer});
        // adds the newly created flashcard to the top of the array
        deck.flashcards.unshift(flashcard);
        deck.save();

        return res.status(201).json({
            message: "flashcard created successfully",
            flashcard: flashcard
        })
    } catch (error) {
        next(error);
    }
}

const flashcardDetail = async (req, res, next) => {
    try {
        const deck = await getDeck(req, res, next);
        const user = await getUser(req.user.id);

        if (!deck) return res.status(404).json({error: "Deck not found"});
        if (!user) return res.status(401).json({error: "User not found "});

        const {flashcardID} = req.params;
        let flashcard = await Flashcard.findOne({_id: flashcardID});

        if (!flashcard) return res.status(404).json({error: "Flashcard not found"});

        return res.status(200).json({
            flashcard: flashcard
        })
    } catch (error) {
        next(error);
    }
}

const updateFlashcard = async (req, res, next) => {
    try {
        const deck = await getDeck(req, res, next);
        const user = await getUser(req.user.id);
        const {flashcardID} = req.params;

        if (!deck) return res.status(404).json({error: "Deck not found"})
        if (!user) return res.status(401).json({error: "User not found "});

        if (!req.body || !req.body.question || !req.body.answer || req.body.question.trim() == "" || req.body.answer.trim() == ""){
            return res.status(400).json({
                error: "Please provide the required fields (question & answer)"})
        }

        let flashcard = await Flashcard.findByIdAndUpdate(flashcardID, req.body, {new: true});

        if (!flashcard) return res.status(404).json({error: "Flashcard not found"});

        return res.status(200).json({
            flashcard: flashcard
        })
    } catch (error) {
        next(error);
    }

}

const deleteFlashcard = async (req, res, next) => {
    try {
        const deck = await getDeck(req, res, next);
        const user = await getUser(req.user.id);
        const {flashcardID} = req.params;

        if (!deck) return res.status(404).json({error: "Deck not found"});
        if (!user) return res.status(404).json({error: "User not found "});

        let result = await Flashcard.findByIdAndDelete(flashcardID);

        if (result.deletedCount == 0) return res.status(404).json({error: "Flashcard not found"});

        return res.status(200).json({
            message: "Flashcard deleted successfully"
        })
    } catch (error) {
        next(error);
    }
}

const mark = async (req, res, next) => {
    try {
        const deck = await getDeck(req, res, next);
        const user = await getUser(req.user.id);
        const {flashcardID, status} = req.params; 
        const statusArray = ["unknown", "known"];

        if (!deck) return res.status(404).json({error: "Deck not found"});

        if (!user) return res.status(404).json({error: "User not found "});

        if (!statusArray.includes(status)) {
            return res.status(400).json({
                error: "Status must either be known or unknown"
            });
        }

        // updates ony the status field of the flashcard model
        let flashcard = await Flashcard.findOneAndUpdate({_id: flashcardID}, {status: status}, {new: true})

        if (!flashcard) return res.status(404).json({error: "Flashcard not found"});

        return res.status(200).json({
            "message": `Flashcard marked as ${status}`
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getFlashcards,
    createFlashcard,
    flashcardDetail,
    updateFlashcard,
    deleteFlashcard,
    mark,
}