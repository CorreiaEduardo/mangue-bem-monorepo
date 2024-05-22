import React, { useState } from "react";
import SearchBar from "../Search";
import appString from "../../utils/appStrings";
import MushroomList from "../MushroomList";
import DefaultButton from "../DefaultButton";
import { Link } from "react-router-dom";
import useGetMushroomData from "../../ViewModel/useMushroomViewModel";
import DropdownMenu from "../DropdownMenu";

const Home = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [mushroomList, setMushroomList] = useState(useGetMushroomData());
  const [searchTerm, setSearchTerm] = useState<string>("");

  const searchFilter = () => {
    const inputValue = searchTerm.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (inputLength === 0) {
      return mushroomList;
    } else {
      const filteredList = mushroomList.content?.commonName?.filter(
        (item: any) => item.name.toLowerCase().includes(inputValue),
      );
      setMushroomList(filteredList);
      return filteredList;
    }
  };

  return (
    <div>
      <div
        className="absolute inset-0 bg-cover bg-center"
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
            <Link
              to={"/profile"}
              className={` mr-5 flex flex-col items-center place-self-end ${isLoggedIn && "hidden"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                fill="none" // Set fill to none to remove default fill
                viewBox="0 0 16 16"
                className="fill-green-700 text-slate-300" // Apply Tailwind CSS class to change fill color to white
              >
                <path
                  d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"
                  stroke="currentColor" // Set stroke color to currentColor to inherit text color
                />
              </svg>

              <span className="text-3xl font-semibold text-green-200">
                {appString.pt.signIn}
              </span>
            </Link>
          </div>
        </div>
        <MushroomList data={searchFilter()} />
      </div>
    </div>
  );
};

export default Home;
