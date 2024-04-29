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
    <div className="bg-white border rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform">
      <img src={image} alt="" className="w-full h-32 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 text-start italic">
          {scientificName}
        </h2>
        <p className="text-gray-700 text-start">{popularName}</p>
        <p className="text-gray-400 grid grid-cols-2 gap-4 text-start m-2">
          <span>{observationNumber}</span>
          <span>{iucn}</span>
        </p>
      </div>
    </div>
  );
};

export default MushroomCard;
