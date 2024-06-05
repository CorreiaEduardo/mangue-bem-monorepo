import React, { useState, useEffect } from "react";
import SearchBar from "../Search";
import appString from "../../utils/appStrings";
import MushroomList from "../MushroomList";
import DefaultButton from "../DefaultButton";
import Select from 'react-select'
import {
  useGetMushroomAutoComplete,
  useGetMushroomData,
} from "../../ViewModel/useMushroomViewModel";
import DropdownMenu from "../DropdownMenu";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import '../../styles/SearchSpecies.css'

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
          <div className="my-5 flex justify-center items-center gap-3">
            <div className="col-span-5 col-start-2 ml-16">
              <div className="flex items-center justify-between gap-3">
                <div className="flex w-full h-[42px] flex-row items-center justify-center">
                  <Select
                  className="search-bar"
                  placeholder="Busque aqui"  
                  options={
                    searchTerm.length > 2?
                      mushroomAutoComplete.data?.content
                        .slice(0, 3)
                        .map((mushroom) => (
                          {
                            value: mushroom.id,
                            label: mushroom.taxonName
                          }
                        ))
                      : []
                    }
                    onInputChange={e => setSearchTerm(e)}
                    onChange={e => console.log(e)}
                  />

                  <DefaultButton
                    text="Buscar"
                    onClick={() => {
                      setSearchParams(urlParams.toString());
                    }}
                    cssClass="h-full"
                  />
                  <DropdownMenu
                    width="w-[100px]"
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                    isOpen={isDropdownOpen}
                    setIsOpen={setIsDropdownOpen}
                  />
                </div>
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
