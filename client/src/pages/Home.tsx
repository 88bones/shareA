import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui//Button";

const Home = () => {
  const [params, setParams] = useState<string>();

  const navigate = useNavigate();

  const handleRoomStart = () => {
    const roomId = Math.floor(Math.random() * 1000000).toString();
    setParams(roomId);
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="flex justify-center items-center text-center flex-col">
      <header className="mb-8 mt-2 p-6 sm:p-0">
        <h1 className="text-2xl md:text-4xl text-white tracking-wider mb-2">
          Code together. In real time
        </h1>
        <h3 className="text-gray-300 text-xs md:text-lg">
          Share a link, start typing, and watch your team's cursor move live- no
          setup, no sign-up required to join
        </h3>
      </header>
      <Button
        icon={ArrowRight}
        label={"Start a room"}
        onClick={() => handleRoomStart()}
      ></Button>
    </div>
  );
};

export default Home;
