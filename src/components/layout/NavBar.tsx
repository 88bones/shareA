import React from "react";

const NavBar = () => {
  const headers = [
    { name: "Pricing", path: "/pricing" },
    { name: "Log In", path: "/login" },
    { name: "Sign Up", path: "/signup" },
  ];

  return (
    <div className="px-4 py-2 flex justify-between items-center bg-transparent backdrop-blur-3xl sticky mb-10">
      <div>
        <h1 className="text-white text-xl tracking-wide font-bold">shareA</h1>
      </div>
      <div className="flex gap-4 text-white text-sm items-center">
        {headers.map((header) => (
          <p className="" key={header.name}>
            <a href={header.path}>{header.name}</a>
          </p>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
