const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const db = require("./app/models");
const http = require("http").Server(app);
const { Server } = require("socket.io");
exports.io = new Server(http, {
  cors: {
    origin: "*",
  },
});
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Cannot connect to the database", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

require("./app/routes/message.routes")(app);

http.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
