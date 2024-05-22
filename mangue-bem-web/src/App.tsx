import React, { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { appRoutes } from "./Routes";
import Navbar from "./components/Navbar";

function App() {
  const [isLoggedIn, setIsloggedIn] = useState(false);
  return (
    <Routes>
      {appRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <>
            <Navbar />
            <route.component
              setIsloggedIn={setIsloggedIn}
              isLoggedIn={isLoggedIn}
              />
              </>
          }
        />
      ))}{" "}
    </Routes>
  );
}

export default App;
