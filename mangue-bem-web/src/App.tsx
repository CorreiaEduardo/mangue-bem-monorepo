import React, { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { appRoutes } from "./Routes";
import Navbar from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider } from './contexts/auth';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const queryClient = new QueryClient();
  const location = useLocation();

  return (
    <AuthProvider>
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
                    <route.component />
                  </motion.div>
                }
              />
            ))}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AnimatePresence>
      </QueryClientProvider>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
