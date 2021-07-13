const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userSchema");
const ErrorResponse = require("../util/errorResponse");

const sendAccessToken = async (id) => {
    const token = await jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRES});
    return token;
};

const sendRefreshToken = async (id) => {
    const token = await jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES });
    return token;
}

exports.register = async (req, res, next) => {

    const { firstName, lastName, username, email, password, contactNumber, avatar } = req.body;
    
    if (firstName.length < 3 || firstName.length < 3) {
        return next(new ErrorResponse("Name must have 3 or more characters!", 400));
    }

    try {
        const userExist = await User.findOne({ $or: [{ username }, { email }] });

        if (userExist) {
            return next(new ErrorResponse("user already registered!", 400));
        };

        const user = await User.create({ firstName, lastName, username, email, password, contactNumber });

        const accessToken = await sendAccessToken(user._id);
        const refreshToken = await sendRefreshToken(user._id);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/api/refresh_token',
            maxAge: 10 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({ user, token: accessToken });

    } catch (err) {
        next(err)
    }
};

exports.login = async (req, res, next) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select("+password");

        if (!user || !(await user.comparePassword(password))) {
            return next(new ErrorResponse("Invalid credentials!"))
        };

        const accessToken = await sendAccessToken(user._id);
        const refreshToken = await sendRefreshToken(user._id);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/api/refresh_token',
            maxAge: 10 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ user, token: accessToken });
        
     } catch (err) {
        next(err)
    }

}

exports.genAccessToken = async (req, res, next) => {

    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return next(new ErrorResponse("You are not signed in", 401));
        }

        const decoded = await promisify(jwt.verify)(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        if (!decoded) {
            return next(new ErrorResponse("You session expired. Please signin to continue", 401));
        };

        const user = await User.findOne({ _id: decoded.id });

        if (!user) {
            return next(new ErrorResponse("User does not exist!", 404));
        };

        const accessToken = await sendAccessToken(user._id);

        res.status(200).json({ user, token: accessToken });

     } catch (err) {
        next(err)
    }
}

exports.logout = async (req, res, next) => {
    try {
        res.clearCookie('refreshToken', { path: "/api/refresh_token" });
        res.json({ message: "You are logged out" });
     } catch (err) {
        next(err)
    }
}