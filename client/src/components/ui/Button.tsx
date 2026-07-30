import type { LucideIcon } from "lucide-react";
import React from "react";

interface ButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon: Icon, label, onClick }) => {
  return (
    <div className="w-full md:w-fit px-4 py-1 rounded-md drop-shadow-lg drop-shadow-mint bg-mint/90 group">
      <button
        onClick={onClick}
        className="text-white group-hover:cursor-pointer flex gap-2 items-center"
      >
        <Icon className="w-4 h-4" />
        <span>{label}</span>
      </button>
    </div>
  );
};

export default Button;
