import React from "react";
import MushroomCard from "./MushroomCard";
import { getMushroomData } from "../ViewModel/MushroomViewModel";
import SearchBar from "./Search";
import OrderButton from "./OrderButton";
import appString from "../utils/appStrings";

const MushroomList = () => {
  const mushroomData = getMushroomData();
  return (
    <div className="container mx-auto my-4 p-4">
      <div className="flex flex-row-reverse">
        <SearchBar searchLabel={appString.pt.scientifcName} />
        <SearchBar searchLabel={appString.pt.location} />
      </div>
      <OrderButton />
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
