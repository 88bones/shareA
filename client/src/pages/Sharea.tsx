import { Trash } from "lucide-react";
import React from "react";
import { socket } from "../libs/socket";

interface ShareaProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const Sharea: React.FC<ShareaProps> = ({ text, setText }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    socket.emit("updateText", newText);
  };

  return (
    <div className="overflow-x-hidden relative">
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Type your text here..."
        className="w-full px-4 border border-r-4 border-white rounded text-white font-light min-h-dvh bg-cyan"
      />

      <div
        className="text-white absolute bottom-20 right-10 bg-mint p-2 rounded-full shadow-lg shadow-teal hover:cursor-pointer"
        onClick={() => setText("")}
      >
        <Trash size={24} />
      </div>
    </div>
  );
};

export default Sharea;
