const express = require("express");
const multer = require("multer");
const User = require("./routes/userRoute");
const ErrorHandler = require("./middlewares/error");
const app = express();

app.use(express.json());
const upload = multer();
app.use(upload.any());

app.use(User);

app.use(ErrorHandler);
module.exports = app;
