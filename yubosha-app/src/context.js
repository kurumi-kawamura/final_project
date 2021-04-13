import React, { createContext, useState } from "react";
export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [lang, setLang] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <AppContext.Provider value={{ lang, setLang, currentUser, setCurrentUser }}>
      {children}
    </AppContext.Provider>
  );
};
