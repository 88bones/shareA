import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { Share2 } from "lucide-react";

const NavBar = () => {
  const headers = [
    { name: "Pricing", path: "/pricing" },
    { name: "Log In", path: "/login" },
    { name: "Sign Up", path: "/signup" },
  ];

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="px-4 py-2 flex justify-between items-center bg-transparent backdrop-blur-3xl sticky">
      <div onClick={() => navigate("/")} className="group">
        <h1 className="text-white text-xl tracking-wide font-bold group-hover:cursor-pointer">
          shareA
        </h1>
      </div>
      <div className="flex gap-4 text-white text-sm items-center">
        {location.pathname === "/" ? (
          headers.map((header) => (
            <p
              className="relative transition-all cursor-pointer after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 ease-in-out hover:after:w-full"
              key={header.name}
            >
              <a href={header.path}>{header.name}</a>
            </p>
          ))
        ) : (
          <Button icon={Share2} label={"Share"} onClick={() => navigate("/")} />
        )}
      </div>
    </div>
  );
};

export default NavBar;
