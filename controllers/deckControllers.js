"use strict";

const Deck = require("../models/Deck");

const allDecks = async(req, res, next) => {
    try {
        let decks = await Deck.find({});
        return res.status(200).json({
            decks: decks 
        })
    } catch (error) {
        next(error);
    }
}

const createDeck = async(req, res, next) => {
    if (!req.body|| !req.body.title || !req.body.description || req.body.title.trim() == "" || req.body.description.trim() == "") {
        return res.status(400).json({
            error: "A deck title and its description must be provided"
        })
    }
    try {
        let {title, description} = req.body

        let deck = await Deck.create({title, description});
        return res.status(201).json({
            message: "Deck created successfully",
            deck: deck
        })
    } catch (error) {
        next(error)
    }
}


const deckDetail = async(req, res, next) => {
    let {title} = req.params;
    try {
        let deck = await Deck.findOne({title})

        if (!deck) {
            return res.status(404).json({
                error: "Deck not found"
            })
        } 
        return res.status(200).json({
            message: "Deck detail",
            deck: deck
        })

    } catch (error) {
        next(error);
    }
}

const updateDeck = async(req, res, next) => {

    if (!req.body || Object.keys(req.body).length == 0){
        return res.status(400).json({
            error: "The request body cannot be empty for updating a deck."
        })
    }

    if (!req.body.title || !req.body.description || req.body.title.trim() == "" || req.body.description.trim() == "") {
        return res.status(400).json({
            error: "A title and its description must be provided for updating a deck"
        })
    }

    let {title} = req.params;
    try {
        let deck = await Deck.findOneAndUpdate({title}, req.body, {new: true});

        if (!deck) {
            return res.status(404).json({
                error: "Deck not found"
            })
        }
        return res.status(200).json({
            message: "Deck updated successfully",
            deck: deck
        })
        
    } catch (error) {
        next(error)
    } 
}

const deleteDeck = async(req, res, next) => {
    let deckTitle = req.params.title;
    try {
        let result = await Deck.deleteOne({title: deckTitle});

        if(result.deletedCount == 0) {
            return res.status(404).json({
                error: "Deck not found"
            })
        }
        
        return res.status(200).json({
            message: "Deck deleted successfully",
        })
    } catch (error) {
        next(error);
    }
}

const study = async (req, res, next) => {
    let {title} = req.params;
    let deck = await Deck.findOne({title: title}).populate("flashcards");

    if (!deck) {
        return res.status(404).json({
            error: "Deck not found"
        })
    }

    try {
        if (deck.flashcards.length == 0) {
            return res.status(404).json({
                error: "No flashcards found in this deck"
            })
        }

        let question, answer;
        let studyCards = [];

        deck.flashcards.forEach(flashcard => {
            question = flashcard.question,
            answer = flashcard.answer

            studyCards.push({"question": question, "answer": answer});
        })
        return res.status(200).json({
            flashcards: studyCards
        })
    } catch (error) {
        next(error);
    }

}

module.exports = {
    createDeck,
    deckDetail,
    allDecks,
    updateDeck,
    deleteDeck,
    study,
}