"use client";
import { Plus } from "lucide-react";
import React, { useState } from "react";

export default function Droptdown({
  title,
  icon,
  subtitle,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <div className="flex justify-between items-center" onClick={toggle}>
        <p className=" uppercase text-gray-600 font-light py-3">{title}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 text-gray-600  ${
            isOpen ? "transform rotate-180 transition-all " : "transition-all "
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="py-3">
          {subtitle && (
            <button className="text-gray-300 py-2  flex justify-center items-center text-sm gap-2">
              <Plus size={20} /> {subtitle}
            </button>
          )}
          {children}
        </div>
      )}
    </div>
  );
}
