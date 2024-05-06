import MushroomList from "./components/MushroomList";
import SearchBar from "./components/Search";
import Login from "./components/Login";
import Map from "./components/Map";

export const appRoutes = [
  {
    path: "/",
    component: MushroomList,
  },
  {
    path: "/profile",
    component: Login,
  },
  {
    path: "/map",
    component: Map,
  },
];
