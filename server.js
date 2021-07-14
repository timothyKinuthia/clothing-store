require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

//imports
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json({ limit: '150mb' }));
app.use(express.urlencoded({ limit: '150mb', extended: true }));
app.use(cors());
app.use(cookieParser());

const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, err => {
    if (err) throw Error;
    console.log("CONNECTED TO DATABASE");
});

//ROUTES
app.use("/api", require("./routes/userRoutes"));
app.use("/api", require("./routes/categoryRoutes"));
app.use("/api", require("./routes/subCategoryRoutes"));
app.use("/api", require("./routes/subSubCategoryRoutes"));
app.use("/api", require("./routes/productRoutes"));
app.use("/api", require("./routes/cloudinaryRoutes"));
app.use("/api", require("./routes/cartRoutes"));


//ERROR HANDLER
app.use("*", errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`app is up on port ${PORT}`);
});