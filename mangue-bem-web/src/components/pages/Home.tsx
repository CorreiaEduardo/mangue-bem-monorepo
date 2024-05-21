import React from "react";
import SearchBar from "../Search";
import appString from "../../utils/appStrings";
import MushroomList from "../MushroomList";
import StatsContainer from "../StatsContainer";
import StatContainerItem from "../StatContainerItem";
import DefaultButton from "../DefaultButton";
import { Link } from "react-router-dom";

interface homeProps {
  isLoggedIn: boolean;
}

const Home = ({ isLoggedIn }: homeProps) => {
  const sampleData = [
    { id: 0, count: "1", description: "obs" },
    { id: 1, count: "1", description: "obs" },
    { id: 2, count: "2", description: "obs" },
    { id: 3, count: "3", description: "obs" },
  ];
  return (
    <div>
      <div className="relative">
        <div className="my-5 grid grid-cols-3 gap-3">
          <div className="col-start-2">
            <SearchBar searchLabel={appString.pt.scientifcName} />
            <div className="flex justify-end ">
              <DefaultButton text="genero" width="w-40" />
              <DefaultButton text="Filtro" width="w-40" />
            </div>
          </div>
          <Link
            to={"/profile"}
            className={`absolute right-0 top-0 mr-5 flex flex-col items-center ${isLoggedIn && "hidden"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
            </svg>
            <span className="text-3xl font-semibold text-green-800">
              Entrar
            </span>
          </Link>
        </div>
      </div>
      <StatsContainer projectName={appString.pt.projectName}>
        {sampleData.map((data) => (
          <StatContainerItem
            key={data.id}
            count={data.count}
            description={data.description}
          />
        ))}
      </StatsContainer>
      <MushroomList />
    </div>
  );
};

export default Home;
