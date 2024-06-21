import Login from "./components/pages/Login";
import MushroomCuration from "./components/pages/MushroomCuration";
import MushroomHeatMap from "./components/pages/MushroomHeatMap";
import MushroomRegister from "./components/pages/MushroomRegister";
import Observation from "./components/pages/Observation";
import Home from "./components/pages/SearchSpecies";
import UserRegister from "./components/pages/UserRegister";

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
    path: "/species/:id",
    component: Observation,
  },
  {
    path: "/register",
    component: UserRegister,
  },
  {
    path: "/mushroomRegister",
    component: MushroomRegister,
  },
  {
    path: "/curation",
    component: MushroomCuration,
  },
];

export function getPathForComponent(
  component: React.ComponentType<any>,
): string | undefined {
  const route = appRoutes.find((route) => route.component === component);
  return route?.path;
}
