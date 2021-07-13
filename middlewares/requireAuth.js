
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userSchema");
const ErrorResponse = require("../util/errorResponse");

exports.requireAuth = async (req, res, next) => {

    try {
        const token = req.header("Authorization");

        if (!token) {
            return next(new ErrorResponse("Your are not signed in. Please signin to continue", 401));
        };

        const decoded = await promisify(jwt.verify)(token, process.env.ACCESS_TOKEN_SECRET);

        if (!decoded) {
            return next(new ErrorResponse("Your are not signed in. Please signin to continue", 401));
        }

        const user = await User.findOne({ _id: decoded.id });

        if (!user) {
            return next(new ErrorResponse("User does not exist!", 401));
        }

        req.user = user;

        next();

    } catch (err) {
        next(err)
    }
}

exports.requireAdmin = async (req, res, next) => {  
    if (req.user.role !== "admin") {
        return next(new ErrorResponse("Access denied.", 403));
    }

    next();
}