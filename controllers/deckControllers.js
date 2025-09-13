"use strict";

const Deck = require("../models/Deck");

const allDecks = async(req, res, next) => {
    try {
        let decks = await Deck.find({});

        if (decks.length != 0) {
            res.status(200).json({
                message: "All decks",
                decks: decks
            })
        } else {
            res.status(404).json({
                message: "All decks", 
                decks: "No decks found"
            })
        }
    } catch (error) {
        next(error);
    }
}

const createDeck = async(req, res, next) => {
    try {
        let deck = await Deck.create({
            title: req.body.title,
            description: req.body.description
        });
        res.status(200).json({
            message: "Deck created successfully",
            deckID: deck.id
        })
    } catch (error) {
        next(error)
    }
}

const deckDetail = async(req, res, next) => {
    let deckTitle = req.params.title;
    try {
        let deck = await Deck.findOne({title: deckTitle})

        if (deck) {
            res.status(200).json({
                message: "Deck detail",
                deck: deck
            })
        } else {
            res.status(404).json({
                message: "Deck Detail",
                error: "Deck not found"
            })
        }

    } catch (error) {
        next(error);
    }
}

const updateDeck = async(req, res, next) => {
    let deckTitle = req.params.title;
    try {
        let deck = await Deck.findOneAndUpdate({title: deckTitle}, req.body, {new: true});
        if (deck) {
            res.status(200).json({
                message: "Deck updated successfully",
            })
        } else {
            res.status(404).json({
                message: "Update deck",
                error: "Deck not found"
            })
        }
        
    } catch (error) {
        next(error)
    } 
}

const deleteDeck = async(req, res, next) => {
    let deckTitle = req.params.title;
    try {
        await Deck.deleteOne({title: deckTitle});
        res.status(200).json({
            message: "Deck deleted successfully",
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
    deleteDeck
}