import { createContext } from "react";
import { useState } from "react";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [userDetails, setUserDetails] = useState({});

  return (
    <UserContext.Provider value={{ user, userDetails }}>
      {children}
    </UserContext.Provider>
  );
};
