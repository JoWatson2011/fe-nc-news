import { createContext, useReducer } from "react";
import { useState } from "react";
export const UserContext = createContext();
export const UserDispatchContext = createContext();

export const usersReducer = (user, action) => {
  switch (action.type) {
    case "login": {
      return action.data;
    }
    case "login": {
      return "";
    }
  }
};

export const UserProvider = ({ children }) => {
  const [userDetails, dispatch] = useReducer(usersReducer, {});

  return (
    <UserContext.Provider value={{ userDetails }}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};
