import React, { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { appRoutes } from "./Routes";

function App() {
  const [isLoggedIn, setIsloggedIn] = useState(false);
  return (
    <Routes>
      {appRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <route.component
              setIsloggedIn={setIsloggedIn}
              isLoggedIn={isLoggedIn}
            />
          }
        />
      ))}{" "}
    </Routes>
  );
}

export default App;
