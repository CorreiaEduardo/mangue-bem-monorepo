import React from "react";
import { Link } from "react-router-dom";

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
  iucn: string;
  authors: string;
  brazilianType: string;
  brazilianTypeSynonym: string;
  inaturalistId: string;
  taxaPhoto: string;
}

const MushroomCard = ({
  id,
  taxaPhoto,
  taxonGenus,
  taxonName,
  commonName,
  iucn,
  inaturalistId,
  brazilianType,
  brazilianTypeSynonym,
}: Mushroom) => {
  return (
    <Link
      to={`/species/${id}`}
      className="flex h-96 w-80 flex-col items-center justify-center overflow-hidden rounded-lg border bg-white p-3 shadow-lg transition-transform hover:scale-105"
    >
      <img
        src={taxaPhoto}
        alt=""
        className=" h-full w-full rounded-lg object-cover"
      />
      <div className="flex flex-col items-center justify-center p-4">
        <h2 className="col mb-2  text-start text-xl font-bold italic">
          {taxonGenus + " " + taxonName}
        </h2>
        <p className="m-2 flex flex-col items-center justify-center gap-1 text-start  text-gray-400">
          <span className="mb-3  text-start text-xl text-gray-700 ">
            {commonName}
          </span>
          <span>{iucn}</span>
          <span>{brazilianType && brazilianTypeSynonym}</span>
        </p>
      </div>
    </Link>
  );
};

export default MushroomCard;
