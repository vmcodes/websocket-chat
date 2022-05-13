module.exports = (app) => {
  const messages = require("../controllers/message.controller");
  const router = require("express").Router();

  // Create a new message
  router.post("/messages", messages.create);

  // Retrieve all messages
  router.get("/messages", messages.findAll);

  app.use("/", router);
};
