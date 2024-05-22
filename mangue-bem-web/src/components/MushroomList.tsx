import React from "react";
import MushroomCard from "./MushroomCard";
import useGetMushroomData from "../ViewModel/useMushroomViewModel";

const MushroomList = ({
  data,
}: {
  data: {
    content: [];
    pagination: {
      totalElements: number;
      totalPages: number;
      pageNumber: number;
      pageSize: number;
      hasNext: boolean;
    };
  };
}) => {
  //const mushroomData = useGetMushroomData();
  const mushroomData = {
    content: [
      {
        id: 1,
        image: "/bg.jpeg",
        taxonName: "Mushroom",
        commonName: "0",
        IUCN: "0",
      },
    ],
  };

  console.log("test " + data);

  return (
    <div className=" mx-16 my-10 rounded-2xl bg-gray-200/50 p-6">
      <div className="flex flex-row-reverse"></div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.content?.map((mushroom: any) => (
          <li key={mushroom.id}>{<MushroomCard {...mushroom} />}</li>
        ))}
      </ul>
    </div>
  );
};

export default MushroomList;
