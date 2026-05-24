const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

/* ================= STATE ================= */
let users = {}; // { userId: socketId }
let userStatus = {}; // online / lastSeen

/* ================= SOCKET ================= */
io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  /* JOIN USER */
  socket.on("join", (userId) => {
    users[userId] = socket.id;

    userStatus[userId] = {
      status: "online",
      lastSeen: null,
    };

    io.emit("users_online", userStatus);
  });

  /* SEND MESSAGE */
  socket.on("send_message", (msg) => {
    io.emit("receive_message", {
      ...msg,
      status: "delivered",
    });
  });

  /* SEEN MESSAGE */
  socket.on("message_seen", ({ userId, chatId }) => {
    io.emit("update_seen", { userId, chatId });
  });

  /* TYPING */
  socket.on("typing", (chatId) => {
    socket.broadcast.emit("typing", chatId);
  });

  socket.on("stop_typing", (chatId) => {
    socket.broadcast.emit("stop_typing", chatId);
  });

  /* DISCONNECT */
  socket.on("disconnect", () => {
    let disconnectedUser = null;

    for (let id in users) {
      if (users[id] === socket.id) {
        disconnectedUser = id;
        delete users[id];
      }
    }

    if (disconnectedUser) {
      userStatus[disconnectedUser] = {
        status: "offline",
        lastSeen: new Date().toLocaleTimeString(),
      };
    }

    io.emit("users_online", userStatus);
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});