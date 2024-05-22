import React, { useState } from "react";

const DropdownMenu = ({ width = "w-40" }: { width: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className={`my-3 ${width} rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm transition duration-300 ease-in  hover:bg-pink-700 hover:shadow-lg  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
        onClick={toggleDropdown}
      >
        Dropdown Button
      </button>
      {isOpen && (
        <div
          className={`absolute z-10 ${width} -left-1/2 mt-2 -translate-x-1/2 transform rounded-md border border-gray-300 bg-white shadow-lg transition duration-300 ease-out`}
        >
          {/* Dropdown content */}
          <div className="grid grid-cols-3">
            {/* First row - Titles */}
            <div className="col-span-1 bg-emerald-300 px-4 py-2 text-gray-700">
              Title 1
            </div>
            <div className="col-span-1 bg-emerald-300 px-4 py-2 text-gray-700">
              Title 2
            </div>
            <div className="col-span-1 bg-emerald-300 px-4 py-2 text-gray-700">
              Title 3
            </div>
            {/* Second row - Options */}
            <a
              href="#"
              className="col-span-1 px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Option 1
            </a>
            <a
              href="#"
              className="col-span-1 px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Option 2
            </a>
            <a
              href="#"
              className="col-span-1 px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Option 3
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
