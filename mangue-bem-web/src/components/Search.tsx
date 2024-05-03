import React from "react";
import appString from "../utils/appStrings";
const SearchBar = (props: { searchLabel: string }) => {
  return (
    <div className="relative mb-8 ml-5 max-w-full flex justify-center">
      <label className="block">
        <span className="block text-sm font-medium text-slate-700">
          {props.searchLabel}
        </span>
        <input
          type="text"
          placeholder={`${appString.pt.search}...`}
          className="min-w-96 border-slate-200 py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out "
        />
      </label>
    </div>
  );
};

export default SearchBar;
