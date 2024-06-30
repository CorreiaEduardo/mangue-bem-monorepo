import React, { useState, useEffect } from "react";
import SearchBar from "../Search";
import appString from "../../utils/appStrings";
import MushroomList from "../MushroomList";
import DefaultButton from "../DefaultButton";
import { FaSearch } from "react-icons/fa";
import Select from "react-select";
import {
  useGetMushroomAutoComplete,
  useGetMushroomData,
  useMushroomDeleteViewModel
} from "../../ViewModel/useMushroomViewModel";
import DropdownMenu from "../DropdownMenu";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import "../../styles/SearchSpecies.css";
import { useAuth } from "../../contexts/auth";
import { confirmAlert } from 'react-confirm-alert';

const Home = () => {
  const urlParams = new URLSearchParams();
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [mushroomList, fetchNextPage, isFetchingNextPage, refetch] =
    useGetMushroomData();

  const deleteMushroomFn = useMushroomDeleteViewModel();

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

  function deleteMushroom(mushroomId: number): void {
    const options = {
      title: 'Tem certeza que deseja excluir?',
      message: 'A exclusão de uma espécie de cogumelo pode afetar registros de observação relacionados.',
      buttons: [
        {
          label: 'Sim, excluir.',
          onClick: () => deleteMushroomFn.mutateAsync(mushroomId)
            .then(() => {
              refetch({});
            })
        },
        {
          label: 'Não, cancelar.',
          onClick: () => {}
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      willUnmount: () => {},
      afterClose: () => {},
      onClickOutside: () => {},
      onKeypress: () => {},
      onKeypressEscape: () => {},
      overlayClassName: "overlay-custom-class-name"
    };
    
    confirmAlert(options);
  }

  return (
    <div>
      <div
        className="relative left-0 top-0 h-screen w-full overflow-y-scroll bg-cover bg-center"
      >
        <div className="relative">
          <div className="py-5 flex items-center justify-center gap-3 bg-[#565656]">
            <div className="col-span-5 col-start-2 ml-16">
              <div className="flex items-center justify-between gap-3">
                <div className="flex h-[42px] w-fit flex-row items-center justify-center">
                  <Select
                    placeholder="Busque aqui"
                    className="search-bar"
                    options={
                      searchTerm.length > 2
                        ? mushroomAutoComplete.data?.content
                            .slice(0, 3)
                            .map((mushroom) => ({
                              value: mushroom.id,
                              label: mushroom.taxonName,
                            }))
                        : []
                    }
                    noOptionsMessage={() => "Busque um cogumelo!"}
                    onInputChange={(e: string) => setSearchTerm(e)}
                  />

                  <button
                  onClick={() => {
                    setSearchParams(urlParams.toString());
                  }}
                  className="font-semibold text-lg leading-6 text-white shadow-sm transition duration-300 ease-in hover:bg-pink-700 hover:shadow-lg rounded-full px-3 py-1.5 bg-emerald-500 h-[42px] w-[42px] mr-[10px]">
                    <FaSearch />
                  </button>
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
          deleteMushroom={deleteMushroom}
          isFetchingNextPage={isFetchingNextPage}
        />
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default Home;
