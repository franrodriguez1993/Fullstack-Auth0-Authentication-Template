'use client';

import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import { UserInterface } from "../interface/user.interface";
import { getUserInfo } from "../services/user";

// determinamos un type y un valor por default:
type UserContextType = {
  user: UserInterface | null,
  setUser:Function
}
const DEFAULT_VALUE_CONTEXT = {user:null, setUser:()=>{}}

// seteamos el context:
const DataContext = createContext<UserContextType>(DEFAULT_VALUE_CONTEXT);

// creamos el provider:
const DataProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserInterface | null>(null)

  // get user info
  useEffect(() => {
  
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserInfo();
        setUser(userData.data.result.user);
      } catch (error) {
        setUser(null); 
      }
    };

    fetchUserInfo();
  }, []);
  
  return (
    <DataContext.Provider value={{user,setUser}}>
      {children}
    </DataContext.Provider>
  )
}

// exportamos el context y el provider:
export const useDataContext = () => {
  return useContext(DataContext);
}

export default DataProvider