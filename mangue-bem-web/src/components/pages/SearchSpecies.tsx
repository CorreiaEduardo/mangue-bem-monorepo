import React, { useState, useEffect } from "react";
import SearchBar from "../Search";
import appString from "../../utils/appStrings";
import MushroomList from "../MushroomList";
import DefaultButton from "../DefaultButton";
import {useGetMushroomAutoComplete, useGetMushroomData} from "../../ViewModel/useMushroomViewModel";
import DropdownMenu from "../DropdownMenu";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const Home = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const urlParams = new URLSearchParams();

  const [mushroomList, fetchNextPage, isFetchingNextPage] =
    useGetMushroomData();

  const [mushroomAutoComplete, fetchmushroomAutoComplete] = useGetMushroomAutoComplete();

  const [autocompleteResults, setAutocompleteResults] = useState<{ id: number, taxonName: string }[]>([]);;

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [selectedOptions, setSelectedOptions] = useState({
    uf: "",
    bioma: "",
    classificacao: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //TODO: typescript type

  useEffect(() => {
    if (searchTerm.length > 2) {
      fetchmushroomAutoComplete().then(() => {
        setAutocompleteResults(mushroomAutoComplete[0].content.slice(0, 3));
      });
    } else {
      setAutocompleteResults([]);
    }
  }, [searchTerm, fetchmushroomAutoComplete]);

  const navigate = useNavigate();

  useEffect(() => {
    const updateUrlWhithFilters = () => {
      if (selectedOptions.uf) {
        urlParams.set("brazilianFederativeUnit",'EQ:' + selectedOptions.uf);
      } else {
        urlParams.delete("brazilianFederativeUnit");
      }

      if (selectedOptions.bioma) {
        urlParams.set("biome.name", 'EQ:' + selectedOptions.bioma);
      } else {
        urlParams.delete("biome.name");
      }

      if (selectedOptions.classificacao) {
        urlParams.set("specie.bemClassification", 'EQ:' + selectedOptions.classificacao);
      } else {
        urlParams.delete("specie.bemClassification");
      }

      if (searchTerm.length > 0) {
        urlParams.set("term", 'LK:' + searchTerm);
      } else {
        urlParams.delete("term");
      }

      navigate({ search: urlParams.toString() });
    };

    updateUrlWhithFilters(); // Executa a função inicialmente

    // Esta função será chamada sempre que selectedOptions, searchTerm mudar
    const unsubscribe = () => {
      updateUrlWhithFilters();
    };

    return () => unsubscribe(); // Limpeza do useEffect
  }, [selectedOptions, searchTerm]);

  return (
    <div>
      <div
        className="relative left-0 top-0 h-screen w-full bg-cover bg-center overflow-y-scroll"
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
                  onClick={fetchNextPage}
                />
                <div>
                  <SearchBar
                    searchLabel={appString.pt.scientifcName}
                    searchTerm={searchTerm}
                    onChange={(term) => {
                      setSearchTerm(term);
                      setIsDropdownOpen(false);
                    }}
                  />
                  {autocompleteResults.length > 0 && (
                    <div className="absolute z-10 mt-1 rounded-md border border-gray-300 bg-white shadow-lg">
                      {autocompleteResults.map(mushroom => (
                        <div
                          key={mushroom.id}
                          className="px-4 py-2 hover:bg-gray-200"
                        >
                          {mushroom.taxonName}
                        </div>
                      ))}
                    </div>
                  )}
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
      </div>
    </div>
  );
};

export default Home;
