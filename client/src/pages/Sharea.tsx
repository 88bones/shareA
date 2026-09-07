import { Trash } from "lucide-react";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getUserId, socket } from "../libs/socket";

interface ShareaProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  userCount: number;
}

const Sharea: React.FC<ShareaProps> = ({ text, setText, userCount }) => {
  const { params: roomId } = useParams();

  const location = useLocation();
  const userId = location.state?.userId ?? getUserId();

  useEffect(() => {
    if (!roomId) return;
    if (!userId) return;

    socket.emit("joinRoom", { roomId, userId });

    return () => {
      socket.emit("leaveRoom", roomId);
    };
  }, [roomId, userId]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    socket.emit("updateText", { roomId, text: newText });
  };

  const handleClear = () => {
    setText("");
    socket.emit("updateText", { roomId, text: "" });
  };

  return (
    <div className="overflow-x-hidden relative">
      <div className="text-white absolute top-4 right-4 z-10 bg-mint px-3 py-2 rounded-full shadow-lg shadow-teal">
        {userCount} {userCount === 1 ? "user" : "users"} in room
      </div>

      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Type your text here..."
        className="w-full px-4 border border-r-4 border-white rounded text-white font-light min-h-dvh bg-cyan"
      />

      <div
        className="text-white absolute bottom-20 right-10 bg-mint p-2 rounded-full shadow-lg shadow-teal hover:cursor-pointer"
        onClick={handleClear}
      >
        <Trash size={24} />
      </div>
    </div>
  );
};

export default Sharea;
