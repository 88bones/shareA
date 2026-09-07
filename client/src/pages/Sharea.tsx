import { Trash } from "lucide-react";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getUserId, socket } from "../libs/socket";
import CodeEditor from "../components/layout/CodeEditor";

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

  const handleChange = (newText: string) => {
    setText(newText);
  };

  const handleClear = () => {
    setText("");
    socket.emit("updateText", { roomId, text: "" });
  };

  return (
    <div className="overflow-x-hidden relative">
      <div className="text-white text-xs absolute top-4 right-2 z-10 bg-mint px-3 py-1 rounded-full shadow-lg shadow-teal">
        {userCount} {userCount === 1 ? "user" : "users"} in room
      </div>

      <CodeEditor
        text={text}
        onChange={handleChange}
        roomId={roomId}
        userId={userId}
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
