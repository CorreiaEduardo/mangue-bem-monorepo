// src/components/MushroomCuration.tsx
import React from "react";
import { useMushroomCurationViewModel } from "../../ViewModel/MushroomCurationViewModel";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";

const MushroomCuration: React.FC = () => {
  const { mushrooms, isLoading, error, approveMushroom, reproveMushroom } =
    useMushroomCurationViewModel();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading mushrooms</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Mushroom Curation</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mushrooms?.map((mushroom: any) => (
          <motion.div
            key={mushroom.id}
            className="overflow-hidden rounded-lg bg-white shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={`https://inaturalist-open-data.s3.amazonaws.com/photos/${mushroom.inaturalistId}/medium.jpg`}
              alt={mushroom.taxonName}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold">
                {mushroom.taxonGenus} {mushroom.taxonName}
              </h2>
              <p className="text-gray-600">
                {mushroom.commonName || "No common name available"}
              </p>
              <p className="text-sm text-gray-600">{mushroom.authors}</p>
              <p className="text-sm text-gray-600">
                Kingdom: {mushroom.taxonKingdom}
              </p>
              <p className="text-sm text-gray-600">
                Phylum: {mushroom.taxonPhylum}
              </p>
              <p className="text-sm text-gray-600">
                Class: {mushroom.taxonClass}
              </p>
              <p className="text-sm text-gray-600">
                Order: {mushroom.taxonOrder}
              </p>
              <p className="text-sm text-gray-600">
                Family: {mushroom.taxonFamily}
              </p>
              <div className="mt-4 flex justify-between">
                <button
                  className="rounded bg-green-500 px-4 py-2 text-white"
                  onClick={() => approveMushroom(mushroom.id)}
                >
                  Approve
                </button>
                <button
                  className="rounded bg-red-500 px-4 py-2 text-white"
                  onClick={() => reproveMushroom(mushroom.id)}
                >
                  Reprove
                </button>
              </div>
            </div>
          </motion.div>
        )) ?? <div>No mushrooms pending approval.</div>}
      </div>
    </div>
  );
};

export default MushroomCuration;
