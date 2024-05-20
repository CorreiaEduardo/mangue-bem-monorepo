import React from "react";
import appString from "../utils/appStrings";
const SearchBar = (props: { searchLabel: string }) => {
  return (
    <div className="relative  mb-8 ml-5 flex max-w-full justify-center">
      <label className="block">
        <input
          type="text"
          placeholder={`${appString.pt.search}...`}
          className="mt-2 min-w-96 rounded-lg border border-slate-200 px-4 py-2 text-gray-700 transition duration-300 ease-in-out focus:border-transparent focus:outline-none "
        />
      </label>
    </div>
  );
};

export default SearchBar;
