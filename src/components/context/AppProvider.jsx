import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [direction, setDirection] = useState("rtl");

  return (
    <AppContext.Provider value={{ direction, setDirection }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
