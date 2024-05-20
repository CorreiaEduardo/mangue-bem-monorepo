import React from "react";

type Mushroom = {
  id: number;
  image: string;
  scientificName: string;
  popularName: string;
  observationNumber: number;
  iucn: string;
};

const MushroomCard = ({
  id,
  image,
  scientificName,
  popularName,
  observationNumber,
  iucn,
}: Mushroom) => {
  return (
    <div className="flex flex-col justify-center overflow-hidden rounded-lg border bg-white p-3 shadow-lg transition-transform hover:scale-105">
      <img src={image} alt="" className="h-32 w-full rounded-lg object-cover" />
      <div className="p-4">
        <h2 className="mb-2 text-start text-xl font-bold italic">
          {scientificName}
        </h2>
        <p className="text-start text-gray-700">{popularName}</p>
        <p className="m-2 grid grid-cols-2 gap-4 text-start text-gray-400">
          <span>{observationNumber}</span>
          <span>{iucn}</span>
        </p>
      </div>
    </div>
  );
};

export default MushroomCard;
