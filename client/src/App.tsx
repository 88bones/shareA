import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/layout/NavBar";
import Home from "./pages/Home";
import Sharea from "./pages/Sharea";
import React, { useEffect, useState } from "react";
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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div className="bg-linear-to-b from-teal to-cyan min-h-screen">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/room/:params" element={<Sharea />}></Route>
      </Routes>
    </div>
  );
}

export default AppWrapper;
