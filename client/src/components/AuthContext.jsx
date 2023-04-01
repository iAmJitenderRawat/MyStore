import { createContext, useState } from 'react'

export const AuthContext=createContext();
export function AuthContextProvider({children}) {
    const [isAuth, setAuth] = useState(false);
    const [search, setSearch] = useState("");
    const [sortName, setSortName] = useState("none");
    const [sortPrice, setSortPrice] = useState("none");
    
  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setAuth,
        search,
        setSearch,
        sortName,
        setSortName,
        sortPrice,
        setSortPrice,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
