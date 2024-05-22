import Login from "./components/pages/Login";
import MushroomHeatMap from "./components/pages/MushroomHeatMap";
import Observation from "./components/pages/Observation";
import Home from "./components/pages/Home";

export const appRoutes = [
  {
    path: "/",
    component: MushroomHeatMap,
  },
  {
    path: "/profile",
    component: Login,
    loginPage: true,
  },
  {
    path: "/search",
    component: Home,
  },
  {
    path: "/observation/:id",
    component: Observation,
  },
];
