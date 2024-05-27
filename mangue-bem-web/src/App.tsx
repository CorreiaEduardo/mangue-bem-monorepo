import React, { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { appRoutes } from "./Routes";
import Navbar from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  const [isLoggedIn, setIsloggedIn] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
