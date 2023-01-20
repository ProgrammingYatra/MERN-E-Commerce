const express = require("express");
const ErrorHandler = require("./middlewares/error");
const Product=require("./routes/productRoute")
const User=require("./routes/userRoute")
const Order=require("./routes/orderRoute")
const cookie=require("cookie-parser")
const app = express();
app.use(cookie())
app.use(express.json());

app.use(Product)
app.use(User)
app.use(Order)

//Error Handler middleware
app.use(ErrorHandler);
module.exports = app;
