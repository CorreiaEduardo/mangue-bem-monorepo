import React from "react";
import MushroomCard from "./MushroomCard";
import useGetMushroomData from "../ViewModel/useMushroomViewModel";
import SearchBar from "./Search";
import OrderButton from "./OrderButton";
import appString from "../utils/appStrings";

const MushroomList = () => {
  const mushroomData = useGetMushroomData();
  console.log(mushroomData);

  return <></>;
};

export default MushroomList;
