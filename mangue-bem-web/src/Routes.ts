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
    authenticated: false,
  },
  {
    path: "/profile",
    component: Login,
    loginPage: true,
    authenticated: false,
  },
  {
    path: "/search",
    component: Home,
    authenticated: false,
  },
  {
    path: "/species/:id",
    component: Observation,
    authenticated: false,
  },
  {
    path: "/register",
    component: UserRegister,
    authenticated: false,
  },
  {
    path: "/mushroomRegister",
    component: MushroomRegister,
    authenticated: true,
  },
  {
    path: "/curation",
    component: MushroomCuration,
    authenticated: true,
    curatorRole: true,
  },
];

export function getPathForComponent(
  component: React.ComponentType<any>,
): string | undefined {
  const route = appRoutes.find((route) => route.component === component);
  return route?.path;
}
