import React, { useState } from "react";
import SearchBar from "../Search";
import appString from "../../utils/appStrings";
import MushroomList from "../MushroomList";
import DefaultButton from "../DefaultButton";
import useGetMushroomData from "../../ViewModel/useMushroomViewModel";
import DropdownMenu from "../DropdownMenu";

const Home = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [mushroomData, get] = useGetMushroomData();
  get();

  const [searchTerm, setSearchTerm] = useState<string>("");

  // const searchFilter = () => {
  //   const inputValue = searchTerm.trim().toLowerCase();
  //   const inputLength = inputValue.length;

  //   if (inputLength === 0) {
  //     return mushroomList;
  //   } else {
  //     const filteredList = mushroomList.content?.commonName?.filter(
  //       (item: any) => item.name.toLowerCase().includes(inputValue),
  //     );
  //     setMushroomList(filteredList);
  //     return filteredList;
  //   }
  // };

  return (
    <div>
      <div
        className="absolute h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.jpeg')" }}
      >
        <div className="relative">
          <div className="my-5 grid grid-cols-4 gap-3">
            <div className="col-span-2 col-start-2 ml-16">
              <div className="flex items-center justify-between">
                <DefaultButton text="Buscar" width="w-40 " animation={false} />
                <SearchBar
                  searchLabel={appString.pt.scientifcName}
                  searchTerm={searchTerm}
                  onChange={setSearchTerm}
                />
                <DropdownMenu width="40" />
              </div>
            </div>
          </div>
        </div>
        <MushroomList data={mushroomData} />
      </div>
    </div>
  );
};

export default Home;
