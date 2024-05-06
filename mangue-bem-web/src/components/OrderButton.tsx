import React from "react";
import appString from "../utils/appStrings";

const OrderButton = () => {
  return (
    <button className="flex items-center justify-center bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-200 focus:ring-opacity-50 my-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-1"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5 8a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm0 4a1 1 0 100 2h8a1 1 0 100-2H6zm-1-3a3 3 0 013-3h6a3 3 0 013 3v6a3 3 0 01-3 3H8a3 3 0 01-3-3V9z"
          clipRule="evenodd"
        />
      </svg>
      {appString.pt.order}
    </button>
  );
};

export default OrderButton;
