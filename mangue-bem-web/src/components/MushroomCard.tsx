import React from "react";

interface Mushroom {
  id: number;
  taxonKingdom: string;
  taxonPhylum: string;
  taxonClass: string;
  taxonOrder: string;
  taxonFamily: string;
  taxonGenus: string;
  taxonName: string;
  commonName: string;
  bemClassification: string;
  description: string;
  IUCN: string;
  authors: string;
  brazilianType: string;
  brazilianTypeSynonym: string;
  iNaturalistId: string;
  image: string;
}

const MushroomCard = ({ id, image, taxonName, commonName, IUCN }: Mushroom) => {
  return (
    <div className="flex h-96 w-80 flex-col items-center justify-center overflow-hidden rounded-lg border bg-white p-3 shadow-lg transition-transform hover:scale-105">
      <img
        src={image}
        alt=""
        className=" h-full w-full rounded-lg object-cover"
      />
      <div className="p-4">
        <h2 className="col mb-2  text-start text-xl font-bold italic">
          {taxonName}
        </h2>
        <p className="m-2 flex flex-col items-center justify-center gap-1 text-start  text-gray-400">
          <span className="mb-3  text-start text-xl text-gray-700 ">
            {commonName}
          </span>
          <span>{id}</span>
          <span>{IUCN}</span>
        </p>
      </div>
    </div>
  );
};

export default MushroomCard;
