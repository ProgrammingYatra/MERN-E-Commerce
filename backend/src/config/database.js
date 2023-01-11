const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
exports.connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then((data) =>
      console.log(`MongoDb is Connected To ${data.connection.host}`)
    );
};
