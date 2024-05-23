import React, { useState, useEffect  } from "react";
import SearchBar from "../Search";
import appString from "../../utils/appStrings";
import MushroomList from "../MushroomList";
import DefaultButton from "../DefaultButton";
import useGetMushroomData from "../../ViewModel/useMushroomViewModel";
import DropdownMenu from "../DropdownMenu";
import { useNavigate } from "react-router-dom";

const Home = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [mushroomData, get] = useGetMushroomData();
  //get();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [autocompleteOptions, setAutocompleteOptions] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState({
    uf: "",
    bioma: "",
    classificacao: ""
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (searchTerm.length > 2) {
      const options = mushroomData.content?.filter((item: any) =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) // TODO: não é name
      ).slice(0, 3) ?? [];

      setAutocompleteOptions(options);
    } else {
      setAutocompleteOptions([]);
    }
  }, [searchTerm, mushroomData.content]);

  const navigate = useNavigate();

  const updateUrlAndFetchData = () => {
    const urlParams = new URLSearchParams();

    if (selectedOptions.uf) {
      urlParams.set("uf", selectedOptions.uf);
    } else {
      urlParams.delete("uf");
    }

    if (selectedOptions.bioma) {
      urlParams.set("bioma", selectedOptions.bioma);
    } else {
      urlParams.delete("bioma");
    }

    if (selectedOptions.classificacao) {
      urlParams.set("classificacao", selectedOptions.classificacao);
    } else {
      urlParams.delete("classificacao");
    }

    navigate({ search: urlParams.toString() });

    get({
      uf: selectedOptions.uf,
      bioma: selectedOptions.bioma,
      classificacao: selectedOptions.classificacao,
      searchTerm: searchTerm,
    });
  };

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
              <div className="flex items-center justify-between gap-3">
                <DefaultButton text="Buscar" width="w-40 " animation={false} onClick={updateUrlAndFetchData} />
                <div>
                  <SearchBar
                    searchLabel={appString.pt.scientifcName}
                    searchTerm={searchTerm}
                    onChange={(term) => {
                      setSearchTerm(term);
                      setIsDropdownOpen(false);
                    }}
                  />
                  {autocompleteOptions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      {autocompleteOptions.map((option, index) => (
                        <div key={index} className="px-4 py-2 hover:bg-gray-200">
                          {option}
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
        <MushroomList data={mushroomData} />
      </div>
    </div>
  );
};

export default Home;
