"use strict";

const notFoundError = (req, res, next) => {
    res.status(404).json({
        error: "Page not found"
    })
}

const internalServerError = (err, req, res, next) => {
    res.status(500).json({
        message: "An error occurred",
        error: err.message
    });
}

module.exports = {
    notFoundError,
    internalServerError
}