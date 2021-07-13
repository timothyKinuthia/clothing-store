const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please provide your first name"],
        maxLength: 25,
        minLength: [3, "Name must have 3 or more characters"],
        trim: true,
        lowercase: true
    },
    lastName: {
        type: String,
        required: [true, "Please provide your last name"],
        maxLength: 25,
        minLength: [3, "Name must have 3 or more characters"],
        trim: true,
        lowercase: true
    },
    username: {
        type: String,
        required: [true, "Please provide your username"],
        unique: [true, "username already exists!"],
        maxLength: 25,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, "Please provide your username"],
        unique: [true, "Email already exists!"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please provide your password"],
        select: false
    },
    role: {
        type: String,
        enum: ["subscriber", "admin"],
        default: "subscriber"
    },
    contactNumber: {
        type: String
    },
    avatar: {
        type: String
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
};

module.exports = mongoose.model("User", userSchema);