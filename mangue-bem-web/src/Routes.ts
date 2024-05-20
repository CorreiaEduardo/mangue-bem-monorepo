import Login from "./components/pages/Login";
import Map from "./components/Map";
import Home from "./components/pages/Home";

export const appRoutes = [
  {
    path: "/",
    component: Home,
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
];
