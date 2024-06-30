import React, { useEffect, useState } from "react";
import Map from "../Map";
import { GiMushroomGills } from "react-icons/gi";
import { Bems } from "../../ViewModel/HeatMapViewModel";
import "../../styles/HeatMap.css"

function MushroomHeatMap() {
  const [selectedBem, setSelectedBem] = useState(0);

  return (
    <div
      className="flex w-full flex-row bg-cover bg-center"
      style={{ height: "calc(100vh - 5rem)" }}
    >
      <div className="flex h-full w-1/4 items-center justify-center bg-[#7EC3DD] p-5">
        <div className="h-full w-full rounded-md bg-gray-50 p-3.5">
          <h1 className="mb-1 text-3xl">Classificações</h1>
          <h3 className="text-center">
            Selecione um <b className="text-green-700">BEM</b> para verificar a
            quantidade de amostras que existem em cada{" "}
            <b className="text-green-700">estado</b>
          </h3>
          <ul className="h-[94%] divide-y overflow-y-auto ">
            {Bems.map((item, index) => (
              <li
                onClick={() => {
                  setSelectedBem(index);
                }}
                className={`flex items-center border-b border-gray-200 py-2 ${selectedBem === index ? "bg-slate-200" : ""} cursor-pointer pr-2 hover:bg-slate-200`}
              >
                <div
                  className="flex w-10 flex-shrink-0 items-center justify-center rounded-full p-1 text-3xl"
                  style={{ backgroundColor: item.color, color: "#fff" }}
                >
                  <GiMushroomGills />
                </div>
                <div className="ml-4 flex-1 text-justify text-gray-800 overflow-hidden h-7 hover:h-40 transition-all duration-300 hover:delay-100 delay-500">
                  <b>{`${item.type} `}</b>
                  <div>
                    {item.description}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex w-3/5 flex-1 items-center justify-center bg-[#7EC3DD]">
        <Map selectedBem={selectedBem} />
      </div>
    </div>
  );
}

export default MushroomHeatMap;
