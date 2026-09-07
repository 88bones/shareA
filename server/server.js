import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const port = process.env.PORT || 3000;
const configuredOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);
const clientOrigins = [
  "http://localhost:5173",
  "https://sharea-iota.vercel.app",
  ...configuredOrigins,
];
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: clientOrigins,
  },
});

const emitRoomUserCount = (roomId) => {
  const count = io.sockets.adapter.rooms.get(roomId)?.size || 0;
  io.to(roomId).emit("roomUserCount", { count });
};

app.get("/", (_request, response) => {
  response.send("Socket server is running");
});

io.on("connection", (socket) => {
  socket.on("joinRoom", async ({ roomId, userId }) => {
    socket.data.userId = userId;
    await socket.join(roomId);

    const roomUsersCount = io.sockets.adapter.rooms.get(roomId)?.size || 0;
    console.log(`Users in room ${roomId}: ${roomUsersCount}`);

    emitRoomUserCount(roomId);
  });

  socket.on("leaveRoom", async (roomId) => {
    if (!socket.rooms.has(roomId)) return;

    socket.to(roomId).emit("cursorLeave", { userId: socket.data.userId });
    socket.leave(roomId);
    await new Promise((resolve) => setImmediate(resolve));
    emitRoomUserCount(roomId);
  });

  socket.on("disconnecting", () => {
    for (const roomId of socket.rooms) {
      if (roomId !== socket.id) {
        socket.to(roomId).emit("cursorLeave", { userId: socket.data.userId });
        setImmediate(() => emitRoomUserCount(roomId));
      }
    }
  });

  socket.on("updateText", ({ roomId, changes, text }) => {
    socket.to(roomId).emit("updateText", { changes, text });
  });

  socket.on("cursorPosition", ({ roomId, userId, position }) => {
    socket.to(roomId).emit("cursorPosition", { userId, position });
  });
});

httpServer.listen(port, () => {
  console.log(`Connected on port ${port}`);
});
