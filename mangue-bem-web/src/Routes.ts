import MushroomList from "./components/MushroomList";
import SearchBar from "./components/Search";
import Login from "./components/Login";

export const appRoutes = [
  {
    path: "/",
    component: MushroomList,
  },
  {
    path: "/profile",
    component: Login,
  },
];
