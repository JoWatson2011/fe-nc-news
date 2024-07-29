import { createContext, useReducer, useState, useEffect } from "react";
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
  const [userDetails, dispatch] = useReducer(
    usersReducer,
    {},
    (initial) => JSON.parse(localStorage.getItem("userDetails")) || initial
  );
  useEffect(() => {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  }, [userDetails]);
  console.log(userDetails);

  return (
    <UserContext.Provider value={{ userDetails }}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};
