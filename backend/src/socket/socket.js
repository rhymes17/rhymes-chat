import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const userSocketIdMap = {};

export const getReceiverSocketId = (receiverId) => userSocketIdMap[receiverId];

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId !== "undefined") {
    userSocketIdMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketIdMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketIdMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketIdMap));
  });
});

export { app, server, io };
