import React, { useState } from "react";
import Map from "../Map";
import { GiMushroomGills } from "react-icons/gi";
import { Bems } from "../../ViewModel/HeatMapViewModel";

function MushroomHeatMap() {

  const [selectedBem, setSelectedBem] = useState({})

  return (
    <div className="flex h-screen w-screen flex-row">
      <div className="flex w-2/5 items-center justify-center bg-red-500 p-5">
        <div className="h-full w-full rounded-md bg-gray-50 p-3.5">
          <h1 className="mb-1 text-3xl">Classificações</h1>
          <ul className="max-h-[630px] divide-y overflow-y-auto ">
            {Bems.map((item) => (
              <li onClick={() => {
                setSelectedBem(selectedBem)
              }} className="flex items-center border-b border-gray-200 py-2 cursor-pointer pr-2 hover:bg-slate-200">
                <div className="flex w-10 flex-shrink-0 items-center justify-center text-3xl" style={{color: item.color}}>
                  <GiMushroomGills />
                </div>
                <div className="ml-4 flex-1 text-justify text-gray-800">
                  <b>{`${item.type}: `}</b>
                  {item.description}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex w-3/5 flex-1 items-center justify-center">
        <Map />
      </div>
    </div>
  );
}

export default MushroomHeatMap;
