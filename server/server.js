import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const port = process.env.PORT || 3000;
const clientOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());
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
