import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/auth";

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
  onDelete: () => void;
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
  onDelete
}: Mushroom) => {
  const { isCurator } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex h-[23rem] w-72 flex-col justify-between items-center overflow-hidden rounded bg-white shadow-lg transition-transform"
    >
      <Link to={`/species/${id}`}>
        <img src={taxaPhoto} alt="" className="h-[240px] w-full object-cover" />
        <div className="flex flex-col items-center justify-center p-1">
          <h2 className="col text-start text-xl font-bold italic">
            {taxonGenus + " " + taxonName}
          </h2>
          <p className="block gap-1 text-start text-gray-400">
            <span className="h-2 mb-3 text-start text-xl text-gray-700">
              {commonName ? commonName : '-'}
            </span>
            <span className="text-center mb-2">{iucn}</span>
            <span className="text-center">{brazilianType && brazilianTypeSynonym}</span>
          </p>
        </div>
      </Link>
      {isCurator() ? (
        <div className="flex w-full justify-between px-8">
          <Link to={`/species/${id}/edit`}><button className="hover:bg-emerald-500 p-4">Editar</button></Link>
          <button className="hover:bg-emerald-500 p-4" onClick={onDelete}>Excluir</button>
        </div>
      ) : null}
    </motion.div>
  );
};

export default MushroomCard;
