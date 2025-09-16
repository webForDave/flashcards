"use strict";

const User = require("../models/User");
const bcrypt = require("bcryptjs");

const register = async (req, res, next) => {
    try {
        if(!req.body) {
            return res.status(400).json({error: "The request body can not be empty"});
        }

        let {username, email, password} = req.body;

        if(!username || !email || !password || username.trim() == "" || email.trim() == "" || password.trim() == ""){
            return res.status(400).json({error: "Please provide the required fields (email, username, & password"})
        }

        let hashedPassword = await bcrypt.hash(password, 10);

        let user = await User.create({username, email, password: hashedPassword});

        return res.status(201).json({message: "User registered successfully", user: user})
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        if(!req.body) {
            return res.status(400).json({error: "The request body can not be empty"});
        }

        let {email, password} = req.body;

        if(!email || !password || email.trim() == "" || password.trim() == ""){
            return res.status(400).json({error: "Please provide the required fields (email, username, & password"})
        }

        let user = await User.findOne({email});

        if (!user) {
            return res.status(404).json({error: "Invalid credentials"});
        }

        let isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(404).json({error: "Invalid credentials"});
        } 

        return res.status(200).json({message: "Login successful!", user: user})

    } catch (error) {
        next(error);
    }
}

const getUsers = async (req, res, next) => {
    try {
        let users = await User.find({});

        return res.status(200).json({users: users})
    } catch (error) {
        next(error);
    }
}

const getUser = async (req, res, next) => {
    try {
        let {userID} = req.params

        let user = await User.findOne({_id: userID});

        if (!user) {
            return res.status(404).json({error: "User not found"})
        }
        return res.status(200).json({user: user})
    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        let {userID} = req.params;

        let result = await User.deleteOne({_id: userID});

        if(result.deletedCount == 0) {
            return res.status(404).json({error: "User not found"});
        }
        return res.status(200).json({message: "User deleted successfully"})
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    getUsers,
    getUser,
    login,
    deleteUser,
}