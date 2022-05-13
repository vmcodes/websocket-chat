const dbConfig = require("../config/db.config");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const models = {
  mongoose: mongoose,
  url: dbConfig.url,
  messages: require("./message.model")(mongoose),
};
module.exports = models;
