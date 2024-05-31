import React, { useState, useEffect } from "react";
import SearchBar from "../Search";
import appString from "../../utils/appStrings";
import MushroomList from "../MushroomList";
import DefaultButton from "../DefaultButton";
import {
  useGetMushroomAutoComplete,
  useGetMushroomData,
} from "../../ViewModel/useMushroomViewModel";
import DropdownMenu from "../DropdownMenu";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";

const Home = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const urlParams = new URLSearchParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const [mushroomList, fetchNextPage, isFetchingNextPage] =
    useGetMushroomData();

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [selectedOptions, setSelectedOptions] = useState({
    uf: "",
    bioma: "",
    classificacao: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (selectedOptions.uf) {
    urlParams.set(
      "observations.brazilianFederativeUnit",
      "EQ:" + selectedOptions.uf,
    );
  } else {
    urlParams.delete("observations.brazilianFederativeUnit");
  }

  if (selectedOptions.bioma) {
    urlParams.set("observations.biome.name", "EQ:" + selectedOptions.bioma);
  } else {
    urlParams.delete("observations.biome.name");
  }

  if (selectedOptions.classificacao) {
    urlParams.set("bemClassification", "EQ:" + selectedOptions.classificacao);
  } else {
    urlParams.delete("bemClassification");
  }

  if (searchTerm.length > 0) {
    urlParams.set("taxonName", "LK:" + searchTerm);
  } else {
    urlParams.delete("taxonName");
  }

  const mushroomAutoComplete = useGetMushroomAutoComplete(
    "?" + urlParams.toString(),
  );

  return (
    <div>
      <div
        className="relative left-0 top-0 h-screen w-full overflow-y-scroll bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.jpeg')" }}
      >
        <div className="relative">
          <div className="my-5 grid grid-cols-4 gap-3">
            <div className="col-span-2 col-start-2 ml-16">
              <div className="flex items-center justify-between gap-3">
                <DefaultButton
                  text="Buscar"
                  width="w-40 "
                  animation={false}
                  onClick={() => {
                    setSearchParams(urlParams.toString());
                  }}
                />
                <div>
                  <SearchBar
                    searchLabel={appString.pt.taxonName}
                    searchTerm={searchTerm}
                    onChange={(term) => {
                      setSearchTerm(term);
                      setIsDropdownOpen(false);
                    }}
                  />

                  {
                    //autocomplete Dropdown
                    searchTerm.length > 2 &&
                      mushroomAutoComplete.data?.content?.length && (
                        <div className="absolute z-10 mt-1 w-64 rounded-md border border-gray-300 bg-white shadow-lg">
                          {mushroomAutoComplete.data?.content
                            .slice(0, 3)
                            .map((mushroom) => (
                              <div
                                key={mushroom.id}
                                className="px-4 py-2 hover:bg-emerald-500"
                              >
                                {mushroom.taxonName}
                              </div>
                            ))}
                        </div>
                      )
                  }
                </div>
                <DropdownMenu
                  width="40"
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                  isOpen={isDropdownOpen}
                  setIsOpen={setIsDropdownOpen}
                />
              </div>
            </div>
          </div>
        </div>
        <MushroomList
          mushroomPages={mushroomList}
          getMushroom={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default Home;
