import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/layout/NavBar";
import Home from "./pages/Home";
import Sharea from "./pages/Sharea";
import { useEffect, useState } from "react";
import { socket } from "./libs/socket";

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  const [text, setText] = useState<string>("");
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection failed:", error.message);
    });

    socket.on("roomUserCount", ({ count }) => {
      setUserCount(count);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("roomUserCount");
      socket.disconnect();
    };
  }, []);

  return (
    <div className="bg-linear-to-b from-teal to-cyan min-h-screen">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/room/:params"
          element={
            <Sharea text={text} setText={setText} userCount={userCount} />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default AppWrapper;
