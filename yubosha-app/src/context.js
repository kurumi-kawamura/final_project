import React, { createContext, useState } from "react";
export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [lang, setLang] = useState(true);

  return (
    <AppContext.Provider value={{ lang, setLang }}>
      {children}
    </AppContext.Provider>
  );
};
