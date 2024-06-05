import React, { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { appRoutes } from "./Routes";
import Navbar from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const queryClient = new QueryClient();
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location}>
          {appRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <route.component
                    setIsloggedIn={setIsloggedIn}
                    isLoggedIn={isLoggedIn}
                  />
                </motion.div>
              }
            />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>
    </QueryClientProvider>
  );
}

export default App;
