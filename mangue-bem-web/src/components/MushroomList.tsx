import React from "react";
import MushroomCard from "./MushroomCard";
import useGetMushroomData from "../ViewModel/useMushroomViewModel";
import SearchBar from "./Search";
import OrderButton from "./OrderButton";
import appString from "../utils/appStrings";

const MushroomList = () => {
  const mushroomData = useGetMushroomData();

  return (
    <div className=" mx-16 my-10 rounded-2xl bg-gray-200/50 p-6">
      <div className="flex flex-row-reverse"></div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mushroomData.map((mushroom: any) => (
          <li key={mushroom.id}>{<MushroomCard {...mushroom} />}</li>
        ))}
      </ul>
    </div>
  );
};

export default MushroomList;
