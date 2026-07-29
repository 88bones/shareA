import React from "react";
import { useParams } from "react-router-dom";

const Sharea = () => {
  const { params } = useParams();
  console.log(params);

  return <div>alllss</div>;
};

export default Sharea;
