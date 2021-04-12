import React, { createContext, useState } from "react";
export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [lang, setLang] = useState(true);
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        userName,
        setUserName,
        password,
        setPassword,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
