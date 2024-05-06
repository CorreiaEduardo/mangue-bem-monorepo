import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { appRoutes } from "./Routes";

function App() {
  return (
    <Routes>
      {appRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      ))}{" "}
    </Routes>
  );
}

export default App;
