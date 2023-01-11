const { promisify } = require("util");
const redis = require("redis");

const redisClient = redis.createClient(
  18986,
  "redis-18986.c212.ap-south-1-1.ec2.cloud.redislabs.com",
  { no_ready_check: true }
);
redisClient.auth("YAfvnwb6Nt09XfCkCZGwbMllm7qNZzC9", function (err) {
  if (err) throw err;
});

redisClient.on("connect", async function () {
  console.log("Connected to Redis..");
});

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

module.exports = { SET_ASYNC, GET_ASYNC };