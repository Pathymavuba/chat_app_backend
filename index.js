const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const socketio = require("socket.io");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("Welcome !");
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`server listening on ${process.env.PORT}`);
});

//create socket server
const io = socketio(server);

io.on("connection", (socket) => {
  console.log(`${socket.id} user  is connected`);

  socket.on("deconnection", function () {
    console.log("a user is disconnected");
  });
});
