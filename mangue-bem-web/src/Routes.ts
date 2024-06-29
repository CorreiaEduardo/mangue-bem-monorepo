import Login from "./components/pages/Login";
import MushroomHeatMap from "./components/pages/MushroomHeatMap";
import Observation from "./components/pages/Observation";
import Home from "./components/pages/SearchSpecies";
import Info from "./components/pages/Info";

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
    path: "/info",
    component: Info,
  },
];

export function getPathForComponent(
  component: React.ComponentType<any>,
): string | undefined {
  const route = appRoutes.find((route) => route.component === component);
  return route?.path;
}
