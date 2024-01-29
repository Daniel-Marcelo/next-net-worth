import React, { PropsWithChildren, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../utils/firebase";

const AuthContext = React.createContext(null);

export const useAuthContext = () => React.useContext(AuthContext);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    onAuthStateChanged(auth, (userData) => {
      if (userData) {
        console.log("%c User is signed in", "background: green; color: white");
        setUser(userData);
      } else {
        console.log("%c User is signed out", "background: red; color: white");
        setUser(null);
      }
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
