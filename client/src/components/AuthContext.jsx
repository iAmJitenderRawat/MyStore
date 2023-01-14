import { createContext, useState } from 'react'

export const AuthContext=createContext();
export function AuthContextProvider({children}) {
    const [auth, setAuth] = useState(false);
    const [search, setSearch] = useState("");
  return (
    <AuthContext.Provider value={{ auth, setAuth, search, setSearch }}>
      {children}
    </AuthContext.Provider>
  );
}
