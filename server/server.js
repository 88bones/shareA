import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("user connected<server>:", socket.id);

  socket.on("updateText", (data) => {
    socket.broadcast.emit("updateText", data);
  });
});

httpServer.listen(3000, () => {
  console.log("Connected in port 3000");
});
