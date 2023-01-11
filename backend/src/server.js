require("dotenv").config();
const app = require("./app");
const { connectDatabase } = require("./config/database");

process.on("uncaughtException", (err) => {
  console.log(`UncaughtError Occure ${err.message}`);
  process.exit(1);
});

//connect Database
connectDatabase();

const server = app.listen(process.env.PORT, function () {
  console.log("Express app running on port " + process.env.PORT);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
