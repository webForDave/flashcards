"use strict";

const Deck = require("../models/Deck");
const User = require("../models/User");

const getUser = async(userID) => {

    let user = await User.findOne({_id: userID}).populate("decks");

    if (!user) return;
    return user
}

const allDecks = async(req, res, next) => {
    try {
        const user = await getUser(req.user.id);

        if (!user) return res.status(404).json({error: "User not found "});

        const decks = user.decks;
        return res.status(200).json({
            user: user._id,
            decks: decks 
        })
    } catch (error) {
        next(error);
    }
}

const createDeck = async(req, res, next) => {
    try {
        const user = await getUser(req.user.id);

        if(!user) return res.status(404).json({error: "User not found"});

        if (!req.body || !req.body.title || !req.body.description || req.body.title.trim() == "" || req.body.description.trim() == "") {
            return res.status(400).json({
                error: "A deck title and its description must be provided"
            })
        }

        const {title, description} = req.body;
        let deck = await Deck.create({title: title, description: description});
        user.decks.unshift(deck);
        await user.save();

        return res.status(201).json({
            message: "Deck created successfully",
            deck: deck
        })
    } catch (error) {
        next(error)
    }
}


const deckDetail = async(req, res, next) => {
    try {
        const {deckID} = req.params;
        const user = await getUser(req.user.id);

        if(!user) return res.status(404).json({error: "User not found"});

        let deck = user.decks.find(deck => deck._id == deckID);

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
    try {
        const {deckID} = req.params;
        const user = await getUser(req.user.id);

        if(!user) return res.status(404).json({error: "user not found"});

        if (!req.body || !req.body.title || !req.body.description || req.body.title.trim() == "" || req.body.description.trim() == "") {
            return res.status(400).json({
                error: "A title and its description must be provided for updating a deck"
            })
        }

        let deck = await Deck.findOneAndUpdate({_id: deckID}, req.body, {new: true});

        if (!deck) return res.status(404).json({error: "Deck not found"});

        return res.status(200).json({
            message: "Deck updated successfully",
            deck: deck
        })
        
    } catch (error) {
        next(error)
    } 
}

const deleteDeck = async(req, res, next) => {
    try {
        const {deckID} = req.params;
        const user = await getUser(req.user.id);

        if(!user) return res.status(404).json({error: "user not found"});

        let result = await Deck.deleteOne({_id: deckID});

        if(result.deletedCount == 0) return res.status(404).json({error: "Deck not found"});
        
        return res.status(200).json({
            message: "Deck deleted successfully",
        })
    } catch (error) {
        next(error);
    }
}

const study = async (req, res, next) => {
    try {
        const {deckID} = req.params;
        const deck = await Deck.findOne({_id: deckID}).populate("flashcards");

        if (!deck) return res.status(404).json({error: "Deck not found"});

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

            studyCards.unshift({"question": question, "answer": answer});
        })
        return res.status(200).json({
            flashcards: studyCards
        })
    } catch (error) {
        next(error);
    }

}

const progress = async (req, res, next) => {
    try {
        const {deckID} = req.params;
        const deck = await Deck.findOne({_id: deckID}).populate("flashcards");

        if (!deck) return res.status(404).json({error: "Deck not found"});

        if (deck.flashcards.length == 0) {
            return res.status(404).json({
                error: "No flashcards found in this deck"
            })
        }
        let knownCards = 0;
        let totalCards = deck.flashcards.length;

        deck.flashcards.forEach(card => {
            if (card.status == "known") {
                knownCards += 1;
            }
        });

        return res.status(200).send({
            "deck": deck.title, 
            "known_cards": knownCards,
            "total_cards": totalCards,
            "progress": (knownCards / totalCards) * 100
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
    progress,
}