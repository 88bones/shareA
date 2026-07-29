import React from "react";
import { useParams } from "react-router-dom";

const Sharea = () => {
  const { params } = useParams();
  console.log(params);

  return (
    <div className="overflow-x-hidden">
      <textarea
        // value={text}
        // onChange={handleChange}
        placeholder="Type your plain text here..."
        className="w-full px-4 border border-r-4 border-white rounded text-white font-light min-h-dvh bg-cyan"
      />
    </div>
  );
};

export default Sharea;
