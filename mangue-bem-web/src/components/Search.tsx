import React from "react";

const SearchBar = () => {
  return (
    <div className="relative my-10">
      <input
        type="text"
        placeholder="Search..."
        className="border rounded-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out w-full"
      />
      <svg
        className="absolute right-3 top-3 h-5 w-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M15.32 13.85l4.15 4.15c.18.18.18.47 0 .65l-1.15 1.15c-.18.18-.47.18-.65 0l-4.15-4.15a8 8 0 1 1 1.79-1.79zM9 15.5A6.5 6.5 0 1 0 9 2a6.5 6.5 0 0 0 0 13z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default SearchBar;
