import React from "react";

function Card({ children }: any) {
  return (
    <div className="flex h-fit min-h-[26rem] w-full flex-col items-center justify-center rounded-3xl border-0 bg-emerald-50 p-5 shadow-xl shadow-emerald-800 sm:w-1/2">
      {children}
    </div>
  );
}

export default Card;
