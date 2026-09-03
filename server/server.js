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

app.get("/", (_request, response) => {
  response.send("Socket server is running");
});

io.on("connection", (socket) => {
  console.log("user connected<server>:", socket.id);

  socket.on("updateText", (data) => {
    socket.broadcast.emit("updateText", data);
  });
});

httpServer.listen(port, () => {
  console.log(`Connected on port ${port}`);
});
