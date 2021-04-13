import React, { createContext, useState } from "react";
export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const useCurrent = (initial, id) => {
    const [value, setValue] = useState(() => {
      let localValue = localStorage.getItem(id);
      if (localValue) {
        return JSON.parse(localValue);
      } else {
        return initial;
      }
    });
    return [value, setValue];
  };
  const [lang, setLang] = useState(true);
  const [currentUser, setCurrentUser] = useCurrent({}, "currentUser");

  return (
    <AppContext.Provider value={{ lang, setLang, currentUser, setCurrentUser }}>
      {children}
    </AppContext.Provider>
  );
};
