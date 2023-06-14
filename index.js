const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const socketio = require("socket.io");

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("Welcome !");
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`server listening on ${process.env.PORT}`);
});

//create socket server
const io = socketio(server, { cors: { origin: "http://localhost:3000" } });
let users = [];
io.on("connection", (socket) => {
  console.log(`${socket.id} user  is connected`);

  //listner for event messages
  socket.on("message", (data) => {
    // console.log(data)
    //send message to all Clients connected
    io.emit("MessageResponse", data);
  });

  // listen when a new newser join chat
  socket.on("newUser", (data) => {
    users.push(data);
    // console.log(data)
    io.emit("NewUserResponse", users);
  });

  socket.on("disconnect", function () {
    console.log("a user is disconnected");

    //update list of connected users
    users = users.filter((user) => user.socketID !== socket.id);
    //resent a new list
    io.emit("NewUserResponse", users);
    socket.disconnect();
  });
});
