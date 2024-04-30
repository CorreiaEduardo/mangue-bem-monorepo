import React from "react";
import appString from "../utils/appStrings";
const SearchBar = () => {
  return (
    <div className="relative mb-8 max-w-full flex flex-auto justify-center">
      <input
        type="text"
        placeholder={`${appString.pt.search}...`}
        className="border min-w-96 rounded-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out "
      />
    </div>
  );
};

export default SearchBar;
