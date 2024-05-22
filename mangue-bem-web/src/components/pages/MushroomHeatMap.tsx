import React from "react";
import Map from "../Map";
import { GiMushroomGills } from "react-icons/gi";

function MushroomHeatMap() {
  const items = [
    {
      type: "BEM1",
      description:
        "Espécies comestíveis que claramente ocorrem e são consumidas no Brasil ou que representam um novo recurso alimentar para o país.",
      color: "#FF5733"
    },
    {
      type: "BEM2",
      description:
        "Espécies comestíveis (após alguns preparos ou cuidados prévios) que claramente ocorrem e são consumidas no Brasil ou que representam um novo recurso alimentar para o país.",
    color: "#33FF57"
    },
    {
      type: "BEM3",
      description:
        "Espécie comestível consumida no Brasil, mas que necessita de mais estudos para confirmar sua identidade e ocorrência no país.",
        color: "#3357FF"
    },
    {
      type: "BEM4",
      description:
        "Espécies comestíveis (após alguns preparos ou cuidados preciosos) consumidas no Brasil, mas que requerem mais estudos para confirmar sua identificação e ocorrência no país.",
        color: "#FF33A1"
    },
    {
      type: "BEM5",
      description:
        "Espécies comestíveis não claramente consumidas no Brasil, mas que representam um novo recurso alimentar para o país. Mais estudos para confirmar sua identidade e ocorrência no Brasil.",
        color: "#FFBD33"
    },
    {
      type: "BEM6",
      description:
        "Espécies comestíveis (após alguns preparos ou cuidados prévios) não claramente consumidas no Brasil, mas que representam um novo recurso alimentar para o país após novos estudos para confirmar sua identificação e ocorrência no Brasil.",
        color: "#FFBD33"
    },
    {
      type: "BEM7",
      description:
        "Espécie que ocorre claramente no Brasil, mas com evidências pouco claras ou ausentes de que foi consumida.",
    color: "#33FFF7"
    },
    {
      type: "BEM8",
      description:
        "Espécie com evidências pouco claras ou ausentes para consumo e que requer mais estudos para confirmar sua identidade e ocorrência no Brasil.",
    color: "#9D33FF"
    },
    {
      type: "BEM9",
      description:
        "Espécie que ocorre claramente no Brasil, mas com comestibilidade não confirmada, incluindo poucos registros venenosos.",
    color: "#FF7E33"
    },
    {
      type: "BEM10",
      description:
        "Espécie que ocorre claramente no Brasil, mas com comestibilidade não confirmada, incluindo poucos registros venenosos.",
    color: "#33FF9A"
    },
    {
      type: "P1",
      description:
        "Espécie venenosa que ocorre claramente no Brasil e causa reação adversa e prejudicial quando consumida.",
    color: "#B8FF33"
    },
    {
      type: "P2",
      description:
        "Espécie venenosa que causa reações adversas e prejudiciais quando consumida e requer mais estudos para confirmar sua identidade e ocorrência no Brasil.",
    color: "#3388FF"
    },
  ];

  return (
    <div className="flex h-screen w-screen flex-row">
      <div className="flex w-2/5 items-center justify-center bg-red-500 p-5">
        <div className="h-full w-full rounded-md bg-gray-50 p-3.5">
          <h1 className="mb-1 text-3xl">Classificações</h1>
          <ul className="max-h-[630px] divide-y overflow-y-auto ">
            {items.map((item) => (
              <li className="flex items-center border-b border-gray-200 py-2 cursor-pointer pr-2 hover:bg-slate-200">
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
