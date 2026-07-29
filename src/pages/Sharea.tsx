import { Trash, X } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Sharea = () => {
  const { params } = useParams();
  // console.log(params);

  const [text, setText] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
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
