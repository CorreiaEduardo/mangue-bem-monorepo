import Login from "./components/pages/Login";
import MushroomHeatMap from "./components/pages/MushroomHeatMap";
import Observation from "./components/pages/Observation";
import Home from "./components/pages/SearchSpecies";

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
];

export function getPathForComponent(
  component: React.ComponentType<any>,
): string | undefined {
  const route = appRoutes.find((route) => route.component === component);
  return route?.path;
}
