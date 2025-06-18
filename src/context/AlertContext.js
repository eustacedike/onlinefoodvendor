'use client';
import { createContext, useContext, useState } from 'react';

import CustomAlert from "@/components/CustomAlert/alert";

const AlertContext = createContext();

export function useAlert() {
  return useContext(AlertContext);
}

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null);

  const showAlert = ({ message, bgColor = '#f8d7da', hrColor = '#f5c6cb' }) => {
    setAlert({ message, bgColor, hrColor });

    setTimeout(() => {
      setAlert(null); // Auto-hide after 4s
    }, 4000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {alert && <CustomAlert {...alert} />}
      {children}
    </AlertContext.Provider>
  );
}
