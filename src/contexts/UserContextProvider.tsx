import { createContext, useState } from "react";

export const UserContext = createContext<any>('')

const UserContextProvider = ({children}:{children:any}) => {
    const [user, setUser] = useState(null)

    const updateUser = (val:any)=>{
      setUser(val)
    }
  return (
    <UserContext.Provider value={{user, updateUser}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider


