import MushroomList from "./components/MushroomList";
import Login from "./components/pages/Login";
import Map from "./components/Map";
import Observation from "./components/pages/Observation";

export const appRoutes = [
  {
    path: "/",
    component: MushroomList,
  },
  {
    path: "/profile",
    component: Login,
    loginPage: true,
  },
  {
    path: "/map",
    component: Map,
  },
  {
    path: "/observation/:id",
    component: Observation
  }
];
