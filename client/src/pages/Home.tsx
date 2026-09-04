import { ArrowRight, DoorOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui//Button";
import { useState } from "react";
import { getUserId } from "../libs/socket";

const Home = () => {
  const [visible, setVisible] = useState(false);
  const [roomID, setRoomID] = useState("");

  const navigate = useNavigate();

  const handleRoomStart = () => {
    const roomId = Math.floor(Math.random() * 1000000).toString();
    navigate(`/room/${roomId}/`, {
      state: { userId: getUserId() },
    });
  };

  console.log(roomID);

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
      <div className="flex gap-6">
        <Button
          icon={ArrowRight}
          label={"Start a room"}
          onClick={() => handleRoomStart()}
        ></Button>
        <Button
          icon={DoorOpen}
          label="Join a room"
          onClick={() => {
            setVisible(!visible);
          }}
        ></Button>
      </div>
      {visible && (
        <div className="relative z-10 mt-10 bg-teal p-4 rounded-xl">
          <h1 className="text-white text-sm mb-2">Enter room ID</h1>
          <input
            type="number"
            name="roomID"
            value={roomID}
            onChange={(e) => setRoomID(e.target.value)}
            className="border border-white rounded mb-2"
          />

          <Button
            icon={ArrowRight}
            label="Join Room"
            onClick={() => {
              navigate(`/room/${roomID}`, {
                state: { userId: getUserId() },
              });
            }}
          ></Button>
        </div>
      )}
    </div>
  );
};

export default Home;
