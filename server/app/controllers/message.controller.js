const server = require("../../server");
const model = require("../models");
const Message = model.messages;

server.io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Create and Save a new Message
exports.create = (req, res) => {
  const message = new Message({
    ...req.body,
  });
  message.save((err) => {
    if (err) res.sendStatus(500);
    server.io.emit("message", req.body);
    res.sendStatus(200);
  });
};

// Retrieve all Messages from the database.
exports.findAll = (req, res) => {
  Message.find({}, (err, messages) => {
    res.json(messages);
  });
};
