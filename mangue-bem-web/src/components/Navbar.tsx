import { Link, Routes, To, useLocation } from "react-router-dom";
import appString from "../utils/appStrings";
import "../styles/navbar.css";
import { appRoutes, getPathForComponent } from "../Routes";
import Home from "./pages/SearchSpecies";
import Login from "./pages/Login";
import MushroomHeatMap from "./pages/MushroomHeatMap";
import Info from "./pages/Info";


function Navbar() {
  const location = useLocation();
  const loginPath = getPathForComponent(Login);
  const searchPath = getPathForComponent(Home);
  const homePath = getPathForComponent(MushroomHeatMap);

  console.log(location)

  return (
    <nav className="navbar sticky flex h-20 w-screen items-center">
      <div className="w-full px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 w-full items-center justify-between">
          <div className="flex items-center sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="h-16 w-auto"
                src="assets/logo.png"
                alt="mangue logo"
              />
            </div>
            <div className="sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <a
                  href={homePath}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    location.pathname === homePath
                      ? "bg-emerald-900 text-white"
                      : "text-emerald-700 hover:bg-pink-500 hover:text-white"
                  }`}
                >
                  {appString.pt.home}
                </a>
                <a
                  href={searchPath}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    location.pathname === searchPath
                      ? "bg-emerald-900 text-white"
                      : "text-emerald-700 hover:bg-pink-500 hover:text-white"
                  }`}
                >
                  {appString.pt.searchSpecies}
                </a>
              </div>
            </div>
          </div>
          <div className="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div>
              <a
                href={loginPath}
                className="relative  ml-4 flex rounded-full bg-emerald-500 text-sm text-pink-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span className="-inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </a>
            </div>

            {/* <div className="relative ml-3">
              
              <div
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  id="user-menu-item-0"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  id="user-menu-item-1"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  id="user-menu-item-2"
                >
                  Sign out
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/*<div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link
            to="/"
            className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-medium text-white"
          >
            {appString.pt.home}
          </Link>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-slate-950 hover:bg-emerald-700 hover:text-white"
          >
            {appString.pt.about}
          </a>
        </div>
      </div>*/}
    </nav>
  );
}

export default Navbar;
