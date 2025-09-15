"use strict";

const Deck = require("../models/Deck");
const Flashcard = require("../models/Flashcard");

const getDeck = async (req, res, next) => {
    let {deckTitle} = req.params;
    try {
        let deck = await Deck.findOne({title: deckTitle}).populate("flashcards");

        if (!deck) {
            return "Deck not found"
        }
        return deck;
    } catch (error) {
        next(error)
    }
}

const getFlashcards = async (req, res, next) => {
    let deck = await getDeck(req, res, next);

    if (deck == "Deck not found") {
        return res.status(404).json({
            error: "Deck not found"
        })
    } 
    return res.status(200).json({
            deck: deck.title,
            flashcards: deck.flashcards
        })
}

const createFlashcard = async (req, res, next) => {
    let deck = await getDeck(req, res, next);

    if (deck == "Deck not found") {
        return res.status(404).json({
            error: "Deck not found"
        })
    }

    if (!req.body || !req.body.question || !req.body.answer || req.body.question.trim() == "" || req.body.answer.trim() == "") {
        return res.status(400).json({
            error: "A flashcard question and its answer must be provided"
        })
    }
    let {question, answer} = req.body;
    try {
        let flashcard = await Flashcard.create({question: question, answer: answer});
        deck.flashcards.push(flashcard);
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
    let deck = await getDeck(req, res, next);

    if (deck == "Deck not found") {
        return res.status(404).json({
            error: "Deck not found"
        })
    }

    let {flashcardID} = req.params;
    
    try {
        const flashcard = await Flashcard.findById(flashcardID);

        if (!flashcard) {
            return res.status(404).json({
                error: "Flashcard not found"
            })
        }
        return res.status(200).json({
            flashcard: flashcard
        })
    } catch (error) {
        next(error);
    }
}

const updateFlashcard = async (req, res, next) => {
    let deck = await getDeck(req, res, next);

    if (deck == "Deck not found") {
        return res.status(404).json({
            error: "Deck not found"
        })
    }

    if (!req.body || Object.keys(req.body).length == 0){
        return res.status(400).json({
            error: "The request body cannot be empty for updating a deck."
        })
    }

    if (!req.body.question || !req.body.answer) {
        return res.status(400).json({
            error: "A question and its answer must be provided for updating a flashcard"
        })
    }

    let {flashcardID} = req.params;

    try {
        let flashcard = await Flashcard.findByIdAndUpdate(flashcardID, req.body, {new: true});

        if (!flashcard) {
            return res.status(404).json({
                error: "Flashcard not found"
            })
        }
        return res.status(200).json({
            flashcard: flashcard
        })
    } catch (error) {
        next(error);
    }

}

const deleteFlashcard = async (req, res, next) => {
    let deck = await getDeck(req, res, next);

    if (deck == "Deck not found") {
        return res.status(404).json({
            error: "Deck not found"
        })
    }

    let {flashcardID} = req.params;
    try {
        let result = await Flashcard.findByIdAndDelete(flashcardID);

        if (!result || result.deletedCount == 0){
            return res.status(404).json({
                error: "Flashcard not found"
            })
        }

        return res.status(200).json({
            message: "Flashcard deleted successfully"
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
}