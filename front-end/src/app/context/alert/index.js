"use client"; // Required for client-side state management

import { createContext, useState, useContext } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, severity = "info", duration = 3000) => {
    setAlert({ message, severity });

    // Automatically hide after `duration` milliseconds
    setTimeout(() => {
      setAlert(null);
    }, duration);
  };

  console.log(alert,showAlert,"ALAL")
  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

// Custom hook for easy usage
export const useAlert = () => useContext(AlertContext);
