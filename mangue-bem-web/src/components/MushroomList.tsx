import React from "react";
import MushroomCard from "./MushroomCard";
import { getMushroomData } from "../ViewModel/MushroomViewModel";

const MushroomList = () => {
  const mushroomData = getMushroomData();
  return (
    <div className="container mx-auto m-10 p-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mushroomData.map((mushroom) => (
          <li key={mushroom.id}>
            <MushroomCard {...mushroom} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MushroomList;
