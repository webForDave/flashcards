"use strict";

const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    // 1. Get the token from the request header
    const token = req.headers.authorization;

    // 2. Check if a token exists
    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Not authorized, no token provided or invalid format" });
    }

    try {
        // 3. Extract the token (remove "Bearer " prefix)
        const tokenValue = token.split(" ")[1];

        // 4. Verify the token using the secret key
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);

        // 5. Attach the user ID to the request object for later use
        req.user = decoded; 
        
        // 6. Proceed to the next middleware or request handler
        next();
    } catch (error) {
        return res.status(401).json({ error: "Not authorized, token failed" });
    }
};

module.exports = { protect };