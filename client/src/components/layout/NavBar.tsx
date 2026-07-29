import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
            <p className="" key={header.name}>
              <a href={header.path}>{header.name}</a>
            </p>
          ))
        ) : (
          <div className="w-full md:w-fit px-4 py-1 rounded-md drop-shadow-lg drop-shadow-mint bg-mint/90 group">
            <button className="text-white group-hover:cursor-pointer flex gap-2 items-center">
              Share <Share2 size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
